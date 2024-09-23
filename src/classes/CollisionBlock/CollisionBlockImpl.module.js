export default class CollisionBlock {
    constructor({ position, width, height, imgSrc, imageWidth, imageHeight, }) {
        this.isLoaded = false;
        this.position = position;
        this.width = width;
        this.height = height;
        if (imgSrc) {
            this.image = new Image();
            this.image.onload = () => {
                this.isLoaded = true;
            };
            this.image.src = imgSrc;
        }
        this.imageWidth = imageWidth || width;
        this.imageHeight = imageHeight || height;
    }
    draw(ctx) {
        if (this.isLoaded) {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.imageWidth, this.imageHeight);
        }
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
//# sourceMappingURL=CollisionBlockImpl.module.js.map