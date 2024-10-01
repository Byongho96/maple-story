class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }
    render(scene, camera) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        // scale and translate the canvas
        this.ctx.scale(this.canvas.width / camera.width, this.canvas.height / camera.height);
        this.ctx.translate(-(camera.position[0] - this.canvas.width / 2), -(camera.position[1] - this.canvas.height / 2));
        // render only objects that are colliding with the camera
        scene.traverse((object) => {
            this.ctx.save();
            this.ctx.translate(object.worldPosition[0], object.worldPosition[1]);
            object.draw(this.ctx);
            this.ctx.restore();
        });
        this.ctx.restore();
    }
}
export default Renderer;
//# sourceMappingURL=Renderer.module.js.map