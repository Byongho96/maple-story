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
}

const imageLoader = new ImageLoader()
export default imageLoader
