var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    createImageBitmap(imageSrc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.beforeLoad();
                const response = yield fetch(imageSrc);
                const blob = yield response.blob();
                const imageBitmap = yield createImageBitmap(blob);
                return imageBitmap;
            }
            catch (error) {
                console.error('Error creating ImageBitmap:', error);
                throw error;
            }
            finally {
                this.onLoad();
            }
        });
    }
    createSpriteImageBitmap(sources) {
        return __awaiter(this, void 0, void 0, function* () {
            const bitmaps = yield Promise.all(sources.map((source) => this.createImageBitmap(source)));
            // calculate total width and max height
            const maxWidth = Math.max(...bitmaps.map((bitmap) => bitmap.width));
            const maxHeight = Math.max(...bitmaps.map((bitmap) => bitmap.height));
            const totalWidth = sources.length * maxWidth;
            // draw bitmaps on offscreen canvas
            const offscreenCanvas = new OffscreenCanvas(totalWidth, maxHeight);
            const ctx = offscreenCanvas.getContext('2d');
            let x = 0;
            bitmaps.forEach((bitmap) => {
                ctx.drawImage(bitmap, Math.round(x + maxWidth / 2 - bitmap.width / 2), Math.round(maxHeight / 2 - bitmap.height / 2));
                x += maxWidth;
            });
            // transfer offscreen canvas to image bitmap
            const combinedBitmap = offscreenCanvas.transferToImageBitmap();
            return combinedBitmap;
        });
    }
}
const imageLoader = new ImageLoader();
export default imageLoader;
//# sourceMappingURL=ImageLoader.module.js.map