import { Position } from 'src/types/index.module.js'
import ICollisionBlock from '@classes/CollisionBlock/CollisionBlock.module.js'

type CollisionBlockProps = {
  position: Position
  width: number
  height: number
}

export default class CollisionBlock implements ICollisionBlock {
  position: Position
  width: number
  height: number

  constructor({ position, width, height }: CollisionBlockProps) {
    this.position = position
    this.width = width
    this.height = height
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
