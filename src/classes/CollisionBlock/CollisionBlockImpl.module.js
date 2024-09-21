var CollisionBlock = /** @class */ (function () {
    function CollisionBlock(_a) {
        var position = _a.position, width = _a.width, height = _a.height;
        this.position = position;
        this.width = width;
        this.height = height;
    }
    CollisionBlock.prototype.draw = function (ctx) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
    return CollisionBlock;
}());
export default CollisionBlock;
//# sourceMappingURL=CollisionBlockImpl.module.js.map