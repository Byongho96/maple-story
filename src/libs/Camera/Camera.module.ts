import Object2D, { Object2DProps } from '../Object2D/Object2D.module.js'

class Camera extends Object2D {
  constructor(props: Object2DProps) {
    super(props)

    this.type = 'camera'
  }
}

export default Camera
