import Player from './src/classes/Character/Player.module.js';
import HenesysScene from './src/classes/Scene/Henesys/HenesysScene.module.js';
// 'https://via.placeholder.com/150'
var scale = window.devicePixelRatio || 1;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var scene;
var player;
var init = function () {
    resize();
    setup();
};
var resize = function () {
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
};
var setup = function () {
    scene = new HenesysScene();
    player = new Player({
        canvas: canvas,
        gravity: scene.gravity,
        maxFallVelocity: scene.maxFallVelocity,
        position: { x: 0, y: 0 },
        imageSrc: 'https://via.placeholder.com/150',
        frame: { count: 1, buffer: 100 },
        scale: 1,
        collisions: scene.collisions,
        platforms: scene.platforms,
    });
};
var lastTime = 0;
var draw = function () {
    var time = performance.now();
    var delta = time - lastTime;
    lastTime = time;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scene.update(delta);
    scene.draw(ctx);
    player.update(delta);
    player.draw(ctx);
    requestAnimationFrame(draw);
};
init();
draw();
window.addEventListener('resize', resize);
//# sourceMappingURL=script.module.js.map