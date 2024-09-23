import CollisionBlock from '@classes/CollisionBlock/CollisionBlockImpl.module'
import ISprite, { SpriteFrame } from '@classes/Sprite/Sprite.module.js'
import Sprite from '@classes/Sprite/SpriteImpl.module'
import { Block, Velocity } from 'src/types/index.module.js'

export type CharacterAnimationKey = 'IDLE' | 'MOVE' | 'JUMP'

export default interface ICharacter extends ISprite {
  direction: 'LEFT' | 'RIGHT'
  velocity: Velocity
  // hitBox: Block

  collisions: CollisionBlock[]
  platforms: CollisionBlock[]

  // animations: {
  //   [key in CharacterAnimationKey]: {
  //     image: HTMLImageElement
  //     frame: SpriteFrame
  //   }
  // }

  draw(ctx: CanvasRenderingContext2D): void
  update(delta: number): void
}
