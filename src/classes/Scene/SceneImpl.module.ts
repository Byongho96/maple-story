import CollisionBlock from '@classes/CollisionBlock/CollisionBlockImpl.module.js'
import IScene from './Scene.module.js'

type SceneProps = {
  gravity?: number
  maxFallVelocity?: number
  bgmSrc: string
  backgroundSrc: string
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
}

type TerrainCode = '0' | '<' | '>' | '-' | '{' | '}' | '=' | '+'
type TerrainType =
  | null
  | 'platformLeft'
  | 'platformRight'
  | 'platformMiddle'
  | 'collisionLeft'
  | 'collisionRight'
  | 'collisionMiddle'
  | 'collisionInner'

const CODE_TERRAIN_MAP: Record<TerrainCode, TerrainType> = {
  '0': null,
  '<': 'platformLeft',
  '>': 'platformRight',
  '-': 'platformMiddle',
  '{': 'collisionLeft',
  '}': 'collisionRight',
  '=': 'collisionMiddle',
  '+': 'collisionInner',
}

export default class Scene implements IScene {
  gravity: number
  maxFallVelocity: number

  bgmSrc: string
  backgroundSrc: string

  platforms: CollisionBlock[] = []
  collisions: CollisionBlock[] = []

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

  constructor(props: SceneProps) {
    this.gravity = props.gravity || 0.7
    this.maxFallVelocity = props.maxFallVelocity || 30
    this.bgmSrc = props.bgmSrc
    this.backgroundSrc = props.backgroundSrc
    this.terrain = props.terrain
    this.terrainSrc = props.terrainSrc

    const backgroundImage = document.getElementById(
      'background'
    ) as HTMLImageElement
    backgroundImage.src = this.backgroundSrc
    const audio = document.getElementById('bgm') as HTMLAudioElement
    audio.src = this.bgmSrc

    let row = 0
    let col = 0
    for (const code of this.terrain) {
      const terrainType = CODE_TERRAIN_MAP[code as TerrainCode]

      if (code === '\n') {
        row++
        col = 0
        continue
      }

      if (terrainType) {
        const position = {
          x: col * 100,
          y: row * 100,
        }

        if (terrainType.startsWith('platform')) {
          this.platforms.push(
            new CollisionBlock({
              position,
              width: 100,
              height: 10,
              imgSrc: this.terrainSrc[terrainType],
              imageWidth: 100,
              imageHeight: 100,
            })
          )
        } else {
          this.collisions.push(
            new CollisionBlock({
              position,
              width: 100,
              height: 100,
              imgSrc: props.terrainSrc[terrainType],
              imageWidth: 100,
              imageHeight: 100,
            })
          )
        }
      }

      col++
    }
  }

  update(delta: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    this.platforms.forEach((platform) => platform.draw(ctx))
    this.collisions.forEach((collision) => collision.draw(ctx))
  }
}
