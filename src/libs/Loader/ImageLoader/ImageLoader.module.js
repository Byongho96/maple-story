class ImageLoader {
    constructor() {
        this.totalCnt = 0;
        this.loadedCnt = 0;
    }
    get isLoaded() {
        return this.loadedCnt >= this.totalCnt;
    }
    beforeLoad() {
        this.totalCnt++;
    }
    onLoad() {
        this.loadedCnt++;
    }
}
const imageLoader = new ImageLoader();
export default imageLoader;
//# sourceMappingURL=ImageLoader.module.js.map