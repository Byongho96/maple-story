import { IObject2D } from '../Object2D/Object2D.interface'

export interface IControls {
  canvas: HTMLCanvasElement
  object: IObject2D | null

  enabled: boolean

  update(delta: number): void
}
