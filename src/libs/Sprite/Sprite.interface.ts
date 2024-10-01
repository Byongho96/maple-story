import { Position } from 'src/types/index.type'

export interface ISprite {
  image: HTMLImageElement

  position: Position
  width: number
  height: number

  frameCount: number
  frameBuffer: number
}
