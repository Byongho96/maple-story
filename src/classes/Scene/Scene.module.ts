import Player from '@classes/Character/Player.module'
import CollisionBlock from '@classes/CollisionBlock/CollisionBlockImpl.module'

export default interface IScene {
  gravity: number
  maxFallVelocity: number
  background: HTMLImageElement
  // mobs: Mob[]
  // otherPlayers: ICharacter[]
  // player: Player
  platforms: CollisionBlock[]
  collisions: CollisionBlock[]

  draw(ctx: CanvasRenderingContext2D): void
  update(delta: number): void
}
