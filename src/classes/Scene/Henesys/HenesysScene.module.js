import Scene from '../SceneImpl.module.js';
import { getStaticPath } from '../../../utils/static.js';
const terrain = `00000000000000000000000
00000000000000000000000
00000000000000000000000
00000000000<----->00000
00000000000000000000000
000000<-->00000<----->0
00000000000000000000000
===}0000000000{====}000
++++===================`;
export default class HenesysScene extends Scene {
    constructor() {
        super({
            gravity: 0.5,
            maxFallVelocity: 30,
            bgmSrc: getStaticPath('/assets/bgm/henesys/FloralLife.mp3'),
            backgroundSrc: getStaticPath('/assets/back/grassySoil/1.png'),
            terrain,
            terrainSrc: {
                platformLeft: getStaticPath('/assets/terrain/grassySoil/edU/0.png'),
                platformRight: getStaticPath('/assets/terrain/grassySoil/edU/1.png'),
                platformMiddle: getStaticPath('/assets/terrain/grassySoil/edU/0.png'),
                collisionLeft: getStaticPath('/assets/terrain/grassySoil/enH0/0.png'),
                collisionRight: getStaticPath('/assets/terrain/grassySoil/enH0/1.png'),
                collisionMiddle: getStaticPath('/assets/terrain/grassySoil/enH0/0.png'),
                collisionInner: getStaticPath('/assets/terrain/grassySoil/bsc/0.png'),
            },
        });
    }
}
//# sourceMappingURL=HenesysScene.module.js.map