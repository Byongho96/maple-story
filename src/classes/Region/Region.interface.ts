import { IObject2D } from 'src/libs/Object2D/Object2D.interface'

export interface IRegion {
  width: number
  height: number
  backgroundSrc: string

  mobs: IObject2D[]
  terrain: IObject2D[]

  gravity: number
  maxFallSpeed: number
}
