var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import imageLoader from '../../../src/libs/Loader/ImageLoader/ImageLoader.module.js';
export default class Sprite {
    constructor(props) {
        this.width = 0;
        this.height = 0;
        this.image = null;
        this.currentFrame = 0;
        this.time = 0;
        this.position = props.position;
        this.width = props.width;
        this.height = props.height;
        this.loadSprite(props.imgSources);
        this.frameCount = props.imgSources.length;
        this.frameBuffer = props.frameBuffer || 500;
        this.isLoop = props.isLoop || true;
        this.onEnd = props.onEnd;
        this.resetFrame();
    }
    loadSprite(imageSources) {
        return __awaiter(this, void 0, void 0, function* () {
            this.image = yield imageLoader.createSpriteImageBitmap(imageSources);
            this.height =
                this.height || this.width * (this.image.height / this.image.width);
        });
    }
    resetFrame() {
        this.currentFrame = 0;
        this.time = 0;
    }
    draw(ctx) {
        if (!this.image)
            return;
        const cropBox = {
            position: [this.image.width * (this.currentFrame / this.frameCount), 0],
            width: this.image.width / this.frameCount,
            height: this.image.height,
        };
        ctx.drawImage(this.image, cropBox.position[0], cropBox.position[1], cropBox.width, cropBox.height, this.position[0] - this.width / 2, this.position[1] - this.height / 2, this.width, this.height);
    }
    update(delta) {
        if (this.frameCount === 1)
            return;
        this.time += delta;
        if (this.time > this.frameBuffer) {
            this.time = 0;
            if (this.currentFrame < this.frameCount - 1)
                this.currentFrame++;
            else if (this.isLoop)
                this.currentFrame = 0;
            else
                this.onEnd && this.onEnd();
        }
    }
}
//# sourceMappingURL=Sprite.module.js.map