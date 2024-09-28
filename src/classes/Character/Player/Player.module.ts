import { SpriteProps } from '../../Sprite/SpriteImpl.module.js'
import ICharacter from '@classes/Character/Character.module.js'
import Sprite from '@classes/Sprite/SpriteImpl.module.js'
import { Position, Velocity } from 'src/types/index.module.js'
import CollisionBlock from '@classes/CollisionBlock/CollisionBlockImpl.module.js'
import { isColliding, isPlatformColliding } from '@utils/collision.module.js'

const sceneWidth = 2300
const sceneHeight = 900

export type PlayerProps = SpriteProps & {
  canvas: HTMLCanvasElement
  gravity: number
  maxFallVelocity: number
  collisions: CollisionBlock[]
  platforms: CollisionBlock[]
  // animations: {
  //   [key: string]: {
  //     imageSrc: string
  //     frame: SpriteFrame
  //   }
  // }
}

export default class Player extends Sprite implements ICharacter {
  private startPosition: Position

  canvas: HTMLCanvasElement
  gravity: number = 0
  maxFallVelocity: number = 0

  direction: 'LEFT' | 'RIGHT'
  velocity: Velocity

  collisions: CollisionBlock[]
  platforms: CollisionBlock[]

  leftPressed: boolean = false
  rightPressed: boolean = false
  isGrounded: boolean = false

  cameraBox = {
    position: { x: 0, y: 0 },
    width: 600,
    height: 500,
  }

  // animations: {
  //   [key in CharacterAnimationKey]: {
  //     image: HTMLImageElement
  //     frame: SpriteFrame
  //   }
  // }

  constructor(props: PlayerProps) {
    super(props)
    this.startPosition = { ...props.position }
    this.canvas = props.canvas

    this.gravity = props.gravity
    this.maxFallVelocity = props.maxFallVelocity
    this.direction = 'RIGHT'
    this.velocity = { x: 5, y: 5 }

    this.collisions = props.collisions
    this.platforms = props.platforms

    this.cameraBox.position = props.position

    // this.animations = props.animations
    // for (let key in this.animations) {
    //   const image = new Image()
    //   image.src = this.animations[key].imageSrc

    //   this.animations[key].image = image
    // }

    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
  }

  handleKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowLeft':
      case 'KeyA':
        event.preventDefault()
        this.leftPressed = true
        this.direction = 'LEFT'
        break
      case 'ArrowRight':
      case 'KeyD':
        event.preventDefault()
        this.rightPressed = true
        this.direction = 'RIGHT'
        break
      case 'AltLeft':
        event.preventDefault()
        if (this.isGrounded) this.velocity.y = -15
        break
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowLeft':
      case 'KeyA':
        this.leftPressed = false
        break
      case 'ArrowRight':
      case 'KeyD':
        this.rightPressed = false
        break
    }
  }

  update(delta: number) {
    // console.log('frame')
    this.applyGravity(delta)

    this.updateVerticalPosition(delta)
    this.updateHorizontalPosition(delta)

    // this.checkForVerticalCollisions()
    // this.checkForHorizontalCollisions()
  }

  draw(ctx: CanvasRenderingContext2D) {
    // super.draw(ctx)

    // draw hitBox
    ctx.fillStyle = 'green'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(
      this.cameraBox.position.x,
      this.cameraBox.position.y,
      this.cameraBox.width,
      this.cameraBox.height
    )
  }

  applyGravity(delta: number) {
    this.velocity.y += this.gravity * (delta / 17)
    if (this.velocity.y > this.maxFallVelocity) {
      this.velocity.y = this.maxFallVelocity
    }
  }

  updateVerticalPosition(delta: number) {
    this.position.y += this.velocity.y * (delta / 17)
    this.isGrounded = false

    if (this.position.y + this.height > sceneHeight) {
      this.position = { ...this.startPosition }
      this.velocity.y = 0
      this.isGrounded = true
      return
    }

    for (let i = 0; i < this.collisions.length; i++) {
      const collision = this.collisions[i]

      if (isColliding(this, collision)) {
        this.position.y = collision.position.y - this.height - 0.01
        this.velocity.y = 0
        this.isGrounded = true
        return
      }
    }

    if (this.velocity.y < 0) return

    for (let i = 0; i < this.platforms.length; i++) {
      const platform = this.platforms[i]

      if (isPlatformColliding(this, platform)) {
        this.position.y = platform.position.y - this.height - 0.01
        this.velocity.y = 0
        this.isGrounded = true
        return
      }
    }
  }

  updateHorizontalPosition(delta: number) {
    if (this.leftPressed) this.position.x -= this.velocity.x * (delta / 17)
    else if (this.rightPressed)
      this.position.x += this.velocity.x * (delta / 17)

    if (this.position.x < 0) {
      this.position.x = 0
      return
    }

    if (this.position.x + this.width > sceneWidth) {
      this.position.x = sceneWidth - this.width
      return
    }

    for (let i = 0; i < this.collisions.length; i++) {
      const collision = this.collisions[i]

      if (isColliding(this, collision)) {
        if (this.leftPressed) {
          this.position.x = collision.position.x + collision.width + 0.01
          return
        }

        if (this.rightPressed) {
          this.position.x = collision.position.x - this.width - 0.01
          return
        }
      }
    }
  }

  updateHorizontalCameraBox(canvas: HTMLCanvasElement, camera: any) {
    // Right
    const cameraBoxRight = this.cameraBox.position.x + this.cameraBox.width

    if (cameraBoxRight > sceneWidth) return

    if (cameraBoxRight > camera.position.x + canvas.width) {
      camera.position.x += this.velocity.x
      return
    }

    // Left
    if (this.cameraBox.position.x < 0) return

    if (this.cameraBox.position.x < camera.position.x) {
      camera.position.x -= this.velocity.x
      return
    }
  }

  updateVerticalCameraBox(canvas: HTMLCanvasElement, camera: any) {
    // Down
    const cameraBoxBottom = this.cameraBox.position.y + this.cameraBox.height

    if (cameraBoxBottom > sceneHeight) return

    if (cameraBoxBottom > camera.position.y + canvas.height) {
      camera.position.y += this.velocity.y
    }

    // Up
    if (this.cameraBox.position.y < 0) return

    if (this.cameraBox.position.y < camera.position.y) {
      camera.position.y -= this.velocity.y
    }
  }
}
