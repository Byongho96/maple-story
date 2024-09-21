import CollisionBlock from '../CollisionBlock/CollisionBlockImpl.module.js';
const CODE_TERRAIN_MAP = {
    '0': null,
    '<': 'platformLeft',
    '>': 'platformRight',
    '-': 'platformMiddle',
    '{': 'collisionLeft',
    '}': 'collisionRight',
    '=': 'collisionMiddle',
    '+': 'collisionInner',
};
export default class Scene {
    constructor(props) {
        this.platforms = [];
        this.collisions = [];
        this.gravity = props.gravity || 0.5;
        this.maxFallVelocity = props.maxFallVelocity || 30;
        this.bgmSrc = props.bgmSrc;
        this.backgroundSrc = props.backgroundSrc;
        this.terrain = props.terrain;
        this.terrainSrc = props.terrainSrc;
        const backgroundImage = document.getElementById('background');
        backgroundImage.src = this.backgroundSrc;
        const audio = document.getElementById('bgm');
        audio.src = this.bgmSrc;
        let row = 0;
        let col = 0;
        for (const code of this.terrain) {
            const terrainType = CODE_TERRAIN_MAP[code];
            if (code === '\n') {
                row++;
                col = 0;
                continue;
            }
            if (terrainType) {
                const position = {
                    x: col * 100,
                    y: row * 100,
                };
                if (terrainType.startsWith('platform')) {
                    this.platforms.push(new CollisionBlock({
                        position,
                        width: 100,
                        height: 100,
                        imgSrc: this.terrainSrc[terrainType],
                        imageWidth: 100,
                        imageHeight: 100,
                    }));
                }
                else {
                    this.collisions.push(new CollisionBlock({
                        position,
                        width: 100,
                        height: 100,
                        imgSrc: props.terrainSrc[terrainType],
                        imageWidth: 100,
                        imageHeight: 100,
                    }));
                }
            }
            col++;
        }
    }
    update(delta) { }
    draw(ctx) {
        this.platforms.forEach((platform) => platform.draw(ctx));
        this.collisions.forEach((collision) => collision.draw(ctx));
    }
}
//# sourceMappingURL=SceneImpl.module.js.map