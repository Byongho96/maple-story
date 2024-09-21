import { Position } from 'src/types/index.module.js'
import ICollisionBlock from '@classes/CollisionBlock/CollisionBlock.module.js'

type CollisionBlockProps = {
  position: Position
  width: number
  height: number

  imgSrc?: string
  imageWidth?: number
  imageHeight?: number
}

export default class CollisionBlock implements ICollisionBlock {
  position: Position
  width: number
  height: number

  image?: HTMLImageElement
  imageWidth: number
  imageHeight: number

  isLoaded: boolean = false

  constructor({
    position,
    width,
    height,
    imgSrc,
    imageWidth,
    imageHeight,
  }: CollisionBlockProps) {
    this.position = position
    this.width = width
    this.height = height

    if (imgSrc) {
      this.image = new Image()
      this.image.onload = () => {
        this.isLoaded = true
      }
      this.image.src = imgSrc
    }

    this.imageWidth = imageWidth || width
    this.imageHeight = imageHeight || height
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.isLoaded) {
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.imageWidth,
        this.imageHeight
      )
    }

    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
