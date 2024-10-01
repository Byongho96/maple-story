import Object2D from 'src/libs/Object2D/Object2D.module'
import { IControls } from '../Controls.interface'
import Camera from 'src/libs/Camera/Camera.module'

type Boundary = {
  top: number
  right: number
  bottom: number
  left: number
}

type GameCameraControlsProps = {
  object: Object2D
  canvas: HTMLCanvasElement
  camera: Camera
  boundary?: Boundary
}

class GameCameraControls implements IControls {
  canvas: HTMLCanvasElement
  object: Object2D
  camera: Camera

  boundary?: Boundary

  enabled: boolean = true

  constructor(props: GameCameraControlsProps) {
    this.object = props.object
    this.canvas = props.canvas
    this.camera = props.camera

    this.boundary = props.boundary
  }

  update(_: number) {
    if (!this.enabled) return

    this.camera.position = { ...this.object.position }

    this.checkHorizontalBoundary()
    this.checkVerticalBoundary()
  }

  checkHorizontalBoundary() {
    if (!this.boundary) return

    // Left
    if (this.camera.position[0] - this.camera.width / 2 < this.boundary.left) {
      this.camera.position[0] =
        this.boundary.left + this.camera.width / 2 + 0.01
      return
    }

    // Right
    if (this.camera.position[0] + this.camera.width / 2 > this.boundary.right) {
      this.camera.position[0] =
        this.boundary.right - this.camera.width / 2 - 0.01
      return
    }
  }

  checkVerticalBoundary() {
    if (!this.boundary) return

    // Bottom
    if (
      this.camera.position[1] + this.camera.height / 2 >
      this.boundary.bottom
    ) {
      this.camera.position[1] =
        this.boundary.bottom - this.camera.height / 2 - 0.01
      return
    }

    // Top
    if (this.camera.position[1] - this.camera.height / 2 < this.boundary.top) {
      this.camera.position[1] =
        this.boundary.top + this.camera.height / 2 + 0.01
      return
    }
  }
}

export default GameCameraControls
