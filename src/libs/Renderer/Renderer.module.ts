import { isColliding } from '@utils/collision.module.js'
import Camera from '../Camera/Camera.module.js'
import Object2D from '../Object2D/Object2D.module.js'
import Scene from '../Scene/Scene.module.js'

class Renderer {
  canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
  }

  render(scene: Scene, camera: Camera) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.save()

    // scale and translate the canvas
    this.ctx.scale(
      this.canvas.width / camera.width,
      this.canvas.height / camera.height
    )
    this.ctx.translate(
      -(camera.position[0] - this.canvas.width / 2),
      -(camera.position[1] - this.canvas.height / 2)
    )

    // render only objects that are colliding with the camera

    const draw = (object: Object2D) => {
      this.ctx.save()
      this.ctx.translate(object.position[0], object.position[1])
      this.ctx.scale(object.isFlipX ? -1 : 1, object.isFlipY ? -1 : 1)

      if (isColliding(camera, object)) {
        if (object.collisionBlock) {
          this.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
          this.ctx.fillRect(
            object.collisionBlock.offset[0] - object.collisionBlock.width / 2,
            object.collisionBlock.offset[1] - object.collisionBlock.height / 2,
            object.collisionBlock.width,
            object.collisionBlock.height
          )
        }

        object.image && object.image.draw(this.ctx)
      }

      object.children.forEach((child) => {
        draw(child)
      })

      this.ctx.restore()
    }
    draw(scene)

    // scene.traverse((object: Object2D) => {
    //   this.ctx.save()
    //   this.ctx.translate(object.worldPosition[0], object.worldPosition[1])
    //   object.draw(this.ctx)
    //   this.ctx.restore()
    // })

    this.ctx.restore()
  }
}

export default Renderer
