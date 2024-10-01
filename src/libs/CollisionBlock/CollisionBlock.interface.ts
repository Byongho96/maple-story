import { CollisionType, Position } from 'src/types/index.type'

export interface ICollisionBlock {
  type: CollisionType
  position: Position
  width: number
  height: number

  collide(block: ICollisionBlock): boolean
}
