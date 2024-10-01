import { getUuid } from '@utils/id.module.js'
import { IObject2D } from './Object2D.interface'
import { CollisionType, Position } from 'src/types/index.type'
import imageLoader from '../Loader/ImageLoader/ImageLoader.module.js'
import CollisionBlock from '../CollisionBlock/CollisionBlock.module.js'
import Sprite from '../Sprite/Sprite.module.js'

export type Object2DProps = {
  position?: Position
  width?: number
  height?: number
  imgSrc?: string
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

  type: string = 'object'

  width: number = 0
  height: number = 0

  image: HTMLImageElement | Sprite | null = null

  isFlipX: boolean = false
  isFlipY: boolean = false

  collisionBlock: CollisionBlock | null = null

  children: IObject2D[] = []
  parent: IObject2D | null = null

  constructor(props: Object2DProps) {
    this._position = props.position || [0, 0]

    this.width = props.width || 0
    this.height = props.height || 0

    if (props.imgSrc) {
      imageLoader.beforeLoad()
      this.image = new Image()
      this.image.onload = () => {
        imageLoader.onLoad()
      }
      this.image.src = props.imgSrc
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

  setImage(image: HTMLImageElement | Sprite) {
    this.image = image
  }

  add(object: Object2D) {
    this.children.push(object)
    object.needsUpdate = true

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
    if (this.needsUpdate) this._calculateWorldPosition()
    if (this.image instanceof Sprite) {
      this.image.update(delta)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.collisionBlock) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
      ctx.fillRect(
        this.collisionBlock.position[0] +
          this.collisionBlock.offset[0] -
          this.collisionBlock.width / 2,
        this.collisionBlock.position[1] +
          this.collisionBlock.offset[1] -
          this.collisionBlock.height / 2,
        this.collisionBlock.width,
        this.collisionBlock.height
      )
    }

    if (!this.image) return

    if (this.image instanceof Sprite) {
      this.image.draw(ctx)
    } else {
      ctx.drawImage(
        this.image,
        this.position[0] - this.width / 2,
        this.position[1] - this.height / 2,
        this.width,
        this.height
      )
    }
  }

  private _calculateWorldPosition() {
    this._worldPosition = { ...this.position }

    if (this.parent) {
      this._worldPosition[0] += this.parent.worldPosition[0]
      this._worldPosition[1] += this.parent.worldPosition[1]
    }

    this.needsUpdate = false
  }
}

export default Object2D
