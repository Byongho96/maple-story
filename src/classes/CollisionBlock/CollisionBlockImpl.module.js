import imageLoader from '../../utils/ImageLoader.module.js';
export default class CollisionBlock {
    constructor({ position, width, height, imgSrc, imageWidth, imageHeight, }) {
        this.position = position;
        this.width = width;
        this.height = height;
        if (imgSrc) {
            imageLoader.beforeLoad();
            this.image = new Image();
            this.image.onload = () => {
                imageLoader.onLoad();
            };
            this.image.src = imgSrc;
        }
        this.imageWidth = imageWidth || width;
        this.imageHeight = imageHeight || height;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.imageWidth, this.imageHeight);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
//# sourceMappingURL=CollisionBlockImpl.module.js.map