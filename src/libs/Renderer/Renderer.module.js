import { isColliding } from '../../utils/collision.module.js';
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }
    render(scene, camera) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.scale(this.canvas.width / camera.width, this.canvas.height / camera.height);
        this.ctx.translate(-(camera.position[0] - this.canvas.width / 2), -(camera.position[1] - this.canvas.height / 2));
        scene.traverse((object) => {
            isColliding(object, camera) && object.draw(this.ctx);
        });
        this.ctx.restore();
    }
}
export default Renderer;
//# sourceMappingURL=Renderer.module.js.map