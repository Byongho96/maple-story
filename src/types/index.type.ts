export type Block = {
  position: Position
  width: number
  height: number
}

export type Position = [number, number]

export type Velocity = [number, number]

export type CollisionType = 'box' | 'platform' | null
