class ImageLoader {
  totalCnt: number = 0
  loadedCnt: number = 0

  constructor() {}

  get isLoaded() {
    return this.loadedCnt >= this.totalCnt
  }

  beforeLoad() {
    this.totalCnt++
  }

  onLoad() {
    this.loadedCnt++
  }

  async createImageBitmap(imageSrc: string): Promise<ImageBitmap> {
    try {
      this.beforeLoad()
      const response = await fetch(imageSrc)
      const blob = await response.blob()
      const imageBitmap = await createImageBitmap(blob)
      return imageBitmap
    } catch (error) {
      console.error('Error creating ImageBitmap:', error)
      throw error
    } finally {
      this.onLoad()
    }
  }

  async createSpriteImageBitmap(sources: string[]): Promise<ImageBitmap> {
    const bitmaps: ImageBitmap[] = await Promise.all(
      sources.map((source) => this.createImageBitmap(source))
    )

    // calculate total width and max height
    const maxWidth = Math.max(...bitmaps.map((bitmap) => bitmap.width))
    const maxHeight = Math.max(...bitmaps.map((bitmap) => bitmap.height))
    const totalWidth = sources.length * maxWidth

    // draw bitmaps on offscreen canvas
    const offscreenCanvas = new OffscreenCanvas(totalWidth, maxHeight)
    const ctx = offscreenCanvas.getContext('2d')

    let x = 0
    bitmaps.forEach((bitmap) => {
      ctx.drawImage(
        bitmap,
        Math.round(x + maxWidth / 2 - bitmap.width / 2),
        Math.round(maxHeight / 2 - bitmap.height / 2)
      )
      x += maxWidth
    })

    // transfer offscreen canvas to image bitmap
    const combinedBitmap: ImageBitmap = offscreenCanvas.transferToImageBitmap()

    return combinedBitmap
  }
}

const imageLoader = new ImageLoader()
export default imageLoader
