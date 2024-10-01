import imageLoader from '../../../src/libs/Loader/ImageLoader/ImageLoader.module.js';
export default class Sprite {
    constructor(props) {
        this.image = new Image();
        this.currentFrame = 0;
        this.time = 0;
        this.position = props.position;
        // load image
        imageLoader.beforeLoad();
        this.image.onload = () => {
            this.width = props.width || this.image.width / props.frameCount;
            this.height =
                props.height || this.width * (this.image.height / this.image.width);
            imageLoader.onLoad();
        };
        this.image.src = props.imageSrc;
        this.isLoop = props.isLoop || true;
        this.onEnd = props.onEnd;
    }
    resetFrame() {
        this.currentFrame = 0;
    }
    draw(ctx) {
        const cropBox = {
            position: [this.currentFrame * (this.image.width / this.frameCount), 0],
            width: this.image.width / this.frameCount,
            height: this.image.height,
        };
        ctx.drawImage(this.image, cropBox.position[0], cropBox.position[1], cropBox.width, cropBox.height, this.position[0], this.position[1], this.width, this.height);
    }
    update(delta) {
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