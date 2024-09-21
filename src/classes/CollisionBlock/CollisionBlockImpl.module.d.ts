import { Position } from '../../../src/types/index.module';
import ICollisionBlock from '../CollisionBlock/CollisionBlock.module';
export default class CollisionBlock implements ICollisionBlock {
    position: Position;
    width: number;
    height: number;
    constructor({ position, width, height }: {
        position: any;
        width: any;
        height: any;
    });
    draw(ctx: CanvasRenderingContext2D): void;
}
