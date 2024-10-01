import { Position } from 'src/types/index.type'
import Sprite from '../Sprite/Sprite.module'
import { ICollisionBlock } from '../CollisionBlock/CollisionBlock.interface'

export type IObject2D = {
  uuid: string
  type: string

  position: Position
  worldPosition: Position
  width: number
  height: number

  image: HTMLImageElement | Sprite | null
  isFlipX: boolean
  isFlipY: boolean

  collisionBlock: ICollisionBlock | null

  children: IObject2D[]
  parent: IObject2D | null

  add(object: IObject2D): void
  remove(object: IObject2D): void
  removeFromParent(): void

  traverse(cb: (object: IObject2D) => void): void

  draw(ctx: CanvasRenderingContext2D): void
  update?(delta: number): void
}
