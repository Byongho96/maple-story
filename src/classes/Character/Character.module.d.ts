import ISprite from '../Sprite/Sprite.module';
import { Position } from '../../../src/types/index.module';
export default interface ICharacter extends ISprite {
    velocity: {
        x: number;
        y: number;
    };
    hitBox: {
        position: Position;
        width: number;
        height: number;
    };
    draw(ctx: CanvasRenderingContext2D): void;
    update(delta: number): void;
}
