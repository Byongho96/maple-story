import { Position } from 'src/types/index.module.js'

export default interface ICollisionBlock {
  position: Position
  width: number
  height: number

  image?: HTMLImageElement
  imageWidth: number
  imageHeight: number

  draw(ctx: CanvasRenderingContext2D): void
}
