import { IObject2D } from 'src/libs/Object2D/Object2D.interface'
import Sprite from 'src/libs/Sprite/Sprite.module'

export type PlayerState = 'idle' | 'jump' | 'walk'

// export const STATE_PRIORITY: Record<PlayerState, number> = {
//   idle: 0,
//   walk: 1,
//   jump: 2,
// }

export interface IPlayer extends IObject2D {
  direction: 1 | 2 // 1: left, 2: right

  state: PlayerState

  obstacles: IObject2D[]
  platforms: IObject2D[]

  jumpForce: number

  sprites: Record<PlayerState, Sprite>

  // idle(): void
  // walk(): void
  jump(): void
}
