import imageLoader from '../../utils/ImageLoader.module.js';
export default class Sprite {
    constructor({ position, imageSrc, frame: { count, buffer }, scale = 1, }) {
        this.image = new Image();
        this.currentFrame = 0;
        this.time = 0;
        this.position = position;
        this.scale = scale;
        // load image
        imageLoader.beforeLoad();
        this.image.onload = () => {
            this.width = (this.image.width / this.frame.count) * this.scale;
            this.height = this.image.height * this.scale;
            imageLoader.onLoad();
        };
        this.image.src = imageSrc;
        this.frame = { count, buffer };
        this.currentFrame = 0;
    }
    draw(ctx) {
        const cropBox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frame.count),
                y: 0,
            },
            width: this.image.width / this.frame.count,
            height: this.image.height,
        };
        ctx.drawImage(this.image, cropBox.position.x, cropBox.position.y, cropBox.width, cropBox.height, this.position.x, this.position.y, this.width, this.height);
    }
    update(delta) {
        this.time += delta;
        if (this.time > this.frame.buffer) {
            this.time = 0;
            if (this.currentFrame < this.frame.count - 1)
                this.currentFrame++;
            else
                this.currentFrame = 0;
        }
    }
}
//# sourceMappingURL=SpriteImpl.module.js.map