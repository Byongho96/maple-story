import { Position } from '../../../src/types/index.module';
export default interface ISprite {
    position: Position;
    width: number;
    height: number;
    scale: number;
    frame: {
        count: number;
        buffer: number;
    };
    draw(ctx: CanvasRenderingContext2D): void;
    update(delta: number): void;
}
