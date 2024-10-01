import Player, { PlayerProps } from '../Player.module.js'

class MyPlayer extends Player {
  constructor(props: PlayerProps) {
    super(props)

    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
  }

  handleKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowLeft':
        event.preventDefault()
        this.move(1)
        break
      case 'ArrowRight':
        event.preventDefault()
        this.move(2)
        break
      case 'AltLeft':
        event.preventDefault()
        this.jump()
        break
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowLeft':
        this.horizontalPressed === 1 && this.stop()
        break
      case 'ArrowRight':
        this.horizontalPressed === 2 && this.stop()
        break
    }
  }
}

export default MyPlayer
