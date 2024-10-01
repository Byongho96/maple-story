import Object2D from '@libs/Object2D/Object2D.module'
import { Block } from 'src/types/index.type'

export const isColliding = (block1: Object2D, block2: Object2D) => {
  return (
    block1.worldPosition[0] - block1.width / 2 <
      block2.worldPosition[0] + block2.width / 2 &&
    block1.worldPosition[0] + block1.width / 2 >
      block2.worldPosition[0] - block2.width / 2 &&
    block1.worldPosition[1] - block1.height / 2 <
      block2.worldPosition[1] + block2.height / 2 &&
    block1.worldPosition[1] + block1.height / 2 >
      block2.worldPosition[1] - block2.height / 2
  )
}
