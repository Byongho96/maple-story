import Scene from '../SceneImpl.module.js';
const terrain = `00000000000
00000000000
00000000000
00000000000
000000<-->0
00000000000
===}0000000
++++=======`;
export default class HenesysScene extends Scene {
    constructor() {
        super({
            gravity: 0.5,
            maxFallVelocity: 30,
            bgmSrc: '/assets/bgm/henesys/FloralLife.mp3',
            backgroundSrc: '/assets/back/grassySoil/1.png',
            terrain,
            terrainSrc: {
                platformLeft: '/assets/terrain/grassySoil/edU/0.png',
                platformRight: '/assets/terrain/grassySoil/edU/1.png',
                platformMiddle: '/assets/terrain/grassySoil/edU/0.png',
                collisionLeft: '/assets/terrain/grassySoil/enH0/0.png',
                collisionRight: '/assets/terrain/grassySoil/enH0/1.png',
                collisionMiddle: '/assets/terrain/grassySoil/enH0/0.png',
                collisionInner: '/assets/terrain/grassySoil/bsc/0.png',
            },
        });
    }
}
//# sourceMappingURL=HenesysScene.module.js.map