import { Position } from 'src/types/index.module.js'
import ISprite, { SpriteFrame } from '@classes/Sprite/Sprite.module.js'

export type SpriteProps = {
  position: Position
  imageSrc: string
  frame: SpriteFrame
  scale?: number
}

export default class Sprite implements ISprite {
  position: Position
  width: number
  height: number
  scale: number

  frame: {
    count: number
    buffer: number // milliseconds for next frame
  }

  loaded: boolean = false
  image: HTMLImageElement = new Image()

  currentFrame: number = 0
  time: number = 0

  constructor({
    position,
    imageSrc,
    frame: { count, buffer },
    scale = 1,
  }: SpriteProps) {
    this.position = position
    this.scale = scale

    // load image
    this.image.onload = () => {
      this.width = (this.image.width / this.frame.count) * this.scale
      this.height = this.image.height * this.scale
      this.loaded = true
    }
    this.image.src = imageSrc

    this.frame = { count, buffer }
    this.currentFrame = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) return

    const cropBox = {
      position: {
        x: this.currentFrame * (this.image.width / this.frame.count),
        y: 0,
      },
      width: this.image.width / this.frame.count,
      height: this.image.height,
    }

    ctx.drawImage(
      this.image,
      cropBox.position.x,
      cropBox.position.y,
      cropBox.width,
      cropBox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  update(delta: number) {
    this.time += delta

    if (this.time > this.frame.buffer) {
      this.time = 0
      if (this.currentFrame < this.frame.count - 1) this.currentFrame++
      else this.currentFrame = 0
    }
  }
}
