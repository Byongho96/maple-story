class ImageLoader {
    constructor() {
        this.totalCnt = 0;
        this.loadedCnt = 0;
    }
    beforeLoad() {
        this.totalCnt++;
    }
    onLoad() {
        this.loadedCnt++;
    }
    isLoaded() {
        return this.loadedCnt >= this.totalCnt;
    }
}
const imageLoader = new ImageLoader();
export default imageLoader;
//# sourceMappingURL=ImageLoader.module.js.map