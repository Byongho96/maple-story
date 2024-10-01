import { Position } from 'src/types/index.type.js'
import imageLoader from 'src/libs/Loader/ImageLoader/ImageLoader.module.js'
import { ISprite } from './Sprite.interface.js'

export type SpriteProps = {
  position: Position
  width: number
  height?: number
  imgSources: string[]
  frameBuffer?: number

  isLoop?: boolean
  onEnd?: () => void
}

export default class Sprite implements ISprite {
  position: Position
  width: number = 0
  height: number = 0

  image: ImageBitmap | null = null

  frameCount: number
  frameBuffer: number

  isLoop: boolean
  onEnd?: () => void

  private currentFrame: number = 0
  private time: number = 0

  constructor(props: SpriteProps) {
    this.position = props.position

    this.width = props.width
    this.height = props.height

    this.loadSprite(props.imgSources)
    this.frameCount = props.imgSources.length
    this.frameBuffer = props.frameBuffer || 500

    this.isLoop = props.isLoop || true
    this.onEnd = props.onEnd

    this.resetFrame()
  }

  async loadSprite(imageSources: string[]) {
    this.image = await imageLoader.createSpriteImageBitmap(imageSources)
    this.height =
      this.height ||
      this.width * ((this.image.height * this.frameCount) / this.image.width)
  }

  resetFrame() {
    this.currentFrame = 0
    this.time = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.image) return

    const cropBox = {
      position: [this.image.width * (this.currentFrame / this.frameCount), 0],
      width: this.image.width / this.frameCount,
      height: this.image.height,
    }

    ctx.drawImage(
      this.image,
      cropBox.position[0],
      cropBox.position[1],
      cropBox.width,
      cropBox.height,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    )
  }

  update(delta: number) {
    if (this.frameCount === 1) return

    this.time += delta

    if (this.time > this.frameBuffer) {
      this.time = 0
      if (this.currentFrame < this.frameCount - 1) this.currentFrame++
      else if (this.isLoop) this.currentFrame = 0
      else this.onEnd && this.onEnd()
    }
  }
}
