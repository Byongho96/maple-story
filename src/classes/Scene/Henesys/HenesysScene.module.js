import CollisionBlock from '../../CollisionBlock/CollisionBlockImpl.module.js';
var HenesysScene = /** @class */ (function () {
    function HenesysScene() {
        this.gravity = 0.5;
        this.maxFallVelocity = 30;
        this.background = new Image();
        this.background.src = '/assets/back/grassySoil/1.png';
        this.platforms = [];
        this.platforms.push(new CollisionBlock({
            position: { x: 700, y: canvas.height - 120 },
            width: 100,
            height: 10,
        }));
        this.collisions = [];
        this.collisions.push(new CollisionBlock({
            position: { x: 300, y: canvas.height - 100 },
            width: 100,
            height: 100,
        }));
    }
    HenesysScene.prototype.update = function (delta) {
        // this.platforms.forEach((platform) => platform.update(delta))
        // this.collisions.forEach((collision) => collision.update(delta))
    };
    HenesysScene.prototype.draw = function (ctx) {
        this.platforms.forEach(function (platform) { return platform.draw(ctx); });
        this.collisions.forEach(function (collision) { return collision.draw(ctx); });
    };
    return HenesysScene;
}());
export default HenesysScene;
//# sourceMappingURL=HenesysScene.module.js.map