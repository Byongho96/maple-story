import Object2D from '@libs/Object2D/Object2D.module.js'
import { IRegion } from './Region.interface'
import { getStaticPath } from '@utils/static.module.js'
import imageLoader from '@libs/Loader/ImageLoader/ImageLoader.module.js'

const TILE_SIZE = 80

const TERRAIN_MAP: Record<number, string> = {
  1: 'bsc', // 4, 내부  // 90 * 60
  2: 'edD', // 1, 한칸 아래 // 48 * 17
  3: 'edU', // 2, 한칸 위 // 55 * 38
  4: 'enH0', // 2, 평형 두칸 위  // 90 * 38
  5: 'enH1', // 2, 평형 두칸 아래  // 90 * 25
  6: 'enV0', // 2, 수직 두칸 왼쪽 // 32 * 60
  7: 'enV1', // 2, 수직 두칸 오른쪽 // 32 * 60
}

export type RegionProps = {
  map: number[][]
  terrainType: string

  backgroundSrc: string
  bgmSrc: string
}

class Region implements IRegion {
  terrainType: string

  width: number
  height: number
  backgroundSrc: string
  bgmSrc: string

  mobs: Object2D[] = []
  terrain: Object2D[] = []
  boundaries: Object2D[] = []

  gravity: number = 0.8
  maxFallSpeed: number = 14

  constructor(props: RegionProps) {
    this.terrainType = props.terrainType

    this.width = props.map[0].length * TILE_SIZE
    this.height = props.map.length * TILE_SIZE

    this.backgroundSrc = props.backgroundSrc
    this.bgmSrc = props.bgmSrc

    this.buildTerrain(props.map)
    this.buildBoundary()
  }

  buildTerrain(map: number[][]) {
    map.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile === 0) return
        const terrain = new Object2D({
          position: [
            x * TILE_SIZE + TILE_SIZE / 2,
            y * TILE_SIZE + TILE_SIZE / 2,
          ],
          width: TILE_SIZE,
          height: TILE_SIZE,
          imageSources: [
            getStaticPath(
              `/assets/map/tile/${this.terrainType}/${TERRAIN_MAP[tile]}/0.png`
            ),
          ],
          collision: {
            type: tile == 2 ? 'platform' : 'box',
            width: TILE_SIZE,
            height: tile == 2 ? TILE_SIZE / 6 : TILE_SIZE,
            offset: [0, tile == 2 ? -TILE_SIZE / 2 + TILE_SIZE / 12 : 0],
          },
        })

        this.terrain.push(terrain)
      })
    })
  }

  buildBoundary() {
    this.boundaries.push(
      new Object2D({
        position: [this.width / 2, -10],
        collision: {
          type: 'box',
          width: this.width,
          height: 20,
        },
      }),
      new Object2D({
        position: [this.width / 2, this.height + 10],
        collision: {
          type: 'box',
          width: this.width,
          height: 20,
        },
      }),
      new Object2D({
        position: [-10, this.height / 2],
        collision: {
          type: 'box',
          width: 20,
          height: this.height,
        },
      }),
      new Object2D({
        position: [this.width + 10, this.height / 2],
        collision: {
          type: 'box',
          width: 20,
          height: this.height,
        },
      })
    )
  }
}

export default Region
