import { Block } from 'src/types/index.module'

export function isColliding(object1: Block, object2: Block) {
  return (
    object1.position.y + object1.height > object2.position.y &&
    object1.position.y < object2.position.y + object2.height &&
    object1.position.x + object1.width > object2.position.x &&
    object1.position.x < object2.position.x + object2.width
  )
}

export function isPlatformColliding(object1: Block, object2: Block) {
  return (
    object1.position.y + object1.height > object2.position.y &&
    object1.position.y + object1.height < object2.position.y + object2.height &&
    object1.position.x + object1.width > object2.position.x &&
    object1.position.x < object2.position.x + object2.width
  )
}
