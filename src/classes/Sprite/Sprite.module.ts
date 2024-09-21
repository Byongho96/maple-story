import { Position } from 'src/types/index.module.js'

export type SpriteFrame = {
  count: number
  buffer: number
}

export default interface ISprite {
  position: Position
  width: number
  height: number
  scale: number
  frame: SpriteFrame

  draw(ctx: CanvasRenderingContext2D): void
  update(delta: number): void
}
