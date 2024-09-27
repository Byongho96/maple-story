class ImageLoader {
  totalCnt: number = 0
  loadedCnt: number = 0

  constructor() {}

  beforeLoad() {
    this.totalCnt++
  }

  onLoad() {
    this.loadedCnt++
  }

  isLoaded() {
    return this.loadedCnt >= this.totalCnt
  }
}

const imageLoader = new ImageLoader()
export default imageLoader
