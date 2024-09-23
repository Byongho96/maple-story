import { Position } from '../../../src/types/index.module';
import ISprite from '../Sprite/Sprite.module';
export default class Sprite implements ISprite {
    position: Position;
    width: number;
    height: number;
    scale: number;
    frame: {
        count: number;
        buffer: number;
    };
    loaded: boolean;
    image: HTMLImageElement;
    currentFrame: number;
    time: number;
    constructor({ position, imageSrc, frame: { count, buffer }, scale }: {
        position: any;
        imageSrc: any;
        frame: {
            count: any;
            buffer: any;
        };
        scale?: number;
    });
    draw(ctx: CanvasRenderingContext2D): void;
    update(delta: number): void;
}
