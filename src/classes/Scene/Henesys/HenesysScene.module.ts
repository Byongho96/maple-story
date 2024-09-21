import CollisionBlock from '@classes/CollisionBlock/CollisionBlockImpl.module.js'
import Scene from '../Scene.module.js'

declare var canvas: any
export default class HenesysScene implements Scene {
  gravity: number = 0.5
  maxFallVelocity: number = 30
  background: HTMLImageElement
  platforms: CollisionBlock[]
  collisions: CollisionBlock[]

  constructor() {
    this.background = new Image()
    this.background.src = '/assets/back/grassySoil/1.png'

    this.platforms = []
    this.platforms.push(
      new CollisionBlock({
        position: { x: 700, y: canvas.height - 120 },
        width: 100,
        height: 10,
      })
    )

    this.collisions = []
    this.collisions.push(
      new CollisionBlock({
        position: { x: 300, y: canvas.height - 100 },
        width: 100,
        height: 100,
      })
    )
  }

  update(delta: number) {
    // this.platforms.forEach((platform) => platform.update(delta))
    // this.collisions.forEach((collision) => collision.update(delta))
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.platforms.forEach((platform) => platform.draw(ctx))
    this.collisions.forEach((collision) => collision.draw(ctx))
  }
}
