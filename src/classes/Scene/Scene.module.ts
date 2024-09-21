import Player from '@classes/Character/Player/Player.module'
import CollisionBlock from '@classes/CollisionBlock/CollisionBlockImpl.module'

export default interface IScene {
  gravity: number
  maxFallVelocity: number

  platforms: CollisionBlock[]
  collisions: CollisionBlock[]

  // mobs: Mob[]
  // otherPlayers: ICharacter[]
  // player: Player

  terrain: string
  terrainSrc: {
    platformLeft: string
    platformRight: string
    platformMiddle: string
    collisionLeft: string
    collisionRight: string
    collisionMiddle: string
    collisionInner: string
  }

  draw(ctx: CanvasRenderingContext2D): void
  update(delta: number): void
}
