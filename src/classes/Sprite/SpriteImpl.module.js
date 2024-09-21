var Sprite = /** @class */ (function () {
    function Sprite(_a) {
        var position = _a.position, imageSrc = _a.imageSrc, _b = _a.frame, count = _b.count, buffer = _b.buffer, _c = _a.scale, scale = _c === void 0 ? 1 : _c;
        var _this = this;
        this.loaded = false;
        this.image = new Image();
        this.currentFrame = 0;
        this.time = 0;
        this.position = position;
        this.scale = scale;
        // load image
        this.image.onload = function () {
            _this.width = (_this.image.width / _this.frame.count) * _this.scale;
            _this.height = _this.image.height * _this.scale;
            _this.loaded = true;
        };
        this.image.src = imageSrc;
        this.frame = { count: count, buffer: buffer };
        this.currentFrame = 0;
    }
    Sprite.prototype.draw = function (ctx) {
        if (!this.loaded)
            return;
        var cropBox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frame.count),
                y: 0,
            },
            width: this.image.width / this.frame.count,
            height: this.image.height,
        };
        ctx.drawImage(this.image, cropBox.position.x, cropBox.position.y, cropBox.width, cropBox.height, this.position.x, this.position.y, this.width, this.height);
    };
    Sprite.prototype.update = function (delta) {
        this.time += delta;
        if (this.time > this.frame.buffer) {
            this.time = 0;
            if (this.currentFrame < this.frame.count - 1)
                this.currentFrame++;
            else
                this.currentFrame = 0;
        }
    };
    return Sprite;
}());
export default Sprite;
//# sourceMappingURL=SpriteImpl.module.js.map