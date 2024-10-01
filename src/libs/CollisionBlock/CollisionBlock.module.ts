import { CollisionType, Position } from 'src/types/index.type'
import { ICollisionBlock } from './CollisionBlock.interface'

type CollisionBlockProps = {
  type: CollisionType
  position: Position
  width: number
  height: number
  offset?: Position
}

class CollisionBlock implements ICollisionBlock {
  type: CollisionType = 'box'
  position: Position
  width: number
  height: number

  offset: Position

  constructor(props: CollisionBlockProps) {
    this.type = props.type
    this.position = props.position
    this.width = props.width
    this.height = props.height
    this.offset = props.offset || [0, 0]
  }

  collide(box: CollisionBlock): boolean {
    if (this.type === 'box' && box.type === 'box') {
      return (
        this.position[1] + this.offset[1] + this.height / 2 >
          box.position[1] + box.offset[1] - box.height / 2 &&
        this.position[1] + this.offset[1] - this.height / 2 <
          box.position[1] + box.offset[1] + box.height / 2 &&
        this.position[0] + this.offset[0] + this.width / 2 >
          box.position[0] + box.offset[0] - box.width / 2 &&
        this.position[0] + this.offset[0] - this.width / 2 <
          box.position[0] + box.offset[0] + box.width / 2
      )
    } else if (this.type === 'box' && box.type === 'platform') {
      return (
        this.position[1] + this.offset[1] + this.height / 2 >
          box.position[1] + box.offset[1] - box.height / 2 &&
        this.position[1] + this.offset[1] + this.height / 2 <
          box.position[1] + box.offset[1] + box.height / 2 &&
        this.position[0] + this.offset[0] + this.width / 2 >
          box.position[0] + box.offset[0] - box.width / 2 &&
        this.position[0] + this.offset[0] - this.width / 2 <
          box.position[0] + box.offset[0] + box.width / 2
      )
    } else if (this.type === 'platform' && box.type === 'box') {
      return (
        box.position[1] + this.offset[1] + box.height / 2 >
          this.position[1] + box.offset[1] - this.height / 2 &&
        box.position[1] + this.offset[1] + box.height / 2 <
          this.position[1] + box.offset[1] + this.height / 2 &&
        box.position[0] + this.offset[0] + box.width / 2 >
          this.position[0] + box.offset[0] &&
        box.position[0] + this.offset[0] <
          this.position[0] + box.offset[0] + this.width
      )
    }
    return false
  }
}

export default CollisionBlock
