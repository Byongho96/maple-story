import { getUuid } from '@utils/id.module.js'
import { IObject2D } from './Object2D.interface'
import { CollisionType, Position } from 'src/types/index.type'
import imageLoader from '../Loader/ImageLoader/ImageLoader.module.js'
import CollisionBlock from '../CollisionBlock/CollisionBlock.module.js'
import Sprite from '../Sprite/Sprite.module.js'

export type Object2DProps = {
  name?: string
  position?: Position
  width?: number
  height?: number
  imageSources?: string[]
  frameBuffer?: number
  collision?: {
    type: CollisionType
    width?: number
    height?: number
    offset?: Position
  }
}

class Object2D implements IObject2D {
  private _uuid: string = getUuid()
  private _position: Position
  private _worldPosition: Position
  needsUpdate: boolean = false

  name: string
  type: string = 'object'

  width: number = 0
  height: number = 0

  image: Sprite | null = null

  isFlipX: boolean = false
  isFlipY: boolean = false

  collisionBlock: CollisionBlock | null = null

  children: Object2D[] = []
  parent: Object2D | null = null

  constructor(props: Object2DProps) {
    this.name = props.name || ''

    this._position = props.position || [0, 0]
    this._worldPosition = [...this._position]

    this.width = props.width || 0
    this.height = props.height || 0

    if (props.imageSources) {
      this.image = new Sprite({
        position: this.position,
        width: this.width,
        height: this.height,
        imgSources: props.imageSources,
        frameBuffer: props.frameBuffer,
      })
    }

    if (props.collision) {
      this.collisionBlock = new CollisionBlock({
        type: props.collision.type,
        position: this.position,
        offset: props.collision.offset || [0, 0],
        width: props.collision.width || this.width,
        height: props.collision.height || this.height,
      })
    }

    return
  }

  get uuid() {
    return this._uuid
  }

  get position() {
    return this._position
  }

  get worldPosition() {
    return this._worldPosition
  }

  set position(value: Position) {
    this._position = value

    this.traverse((object) => {
      object.needsUpdate = true
    })
  }

  add(object: Object2D) {
    this.children.push(object)
    object.parent = this

    this.traverse((object) => {
      object.needsUpdate = true
    })
  }

  remove(object: Object2D) {
    this.children = this.children.filter((child) => child.uuid !== object.uuid)
    object.parent = null
  }

  removeFromParent() {
    if (this.parent) {
      this.parent.remove(this)
    }
  }

  traverse(cb: (object: Object2D) => void) {
    cb(this)
    this.children.forEach((child) => child.traverse(cb))
  }

  update(delta: number) {
    this._calculateWorldPosition()

    if (!this.image) return

    this.image.update(delta)
  }

  private _calculateWorldPosition() {
    this._worldPosition = [...this.position]

    if (this.parent) {
      this._worldPosition[0] += this.parent.worldPosition[0]
      this._worldPosition[1] += this.parent.worldPosition[1]
    }

    this.needsUpdate = false
  }
}

export default Object2D
