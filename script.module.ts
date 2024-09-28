import Player from '@classes/Character/Player/Player.module.js'
import HenesysScene from '@classes/Scene/Henesys/HenesysScene.module.js'
import IScene from '@classes/Scene/Scene.module.js'
import imageLoader from '@utils/ImageLoader.module.js'

// 'https://via.placeholder.com/150'

const scale = window.devicePixelRatio || 1

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')

let scene: IScene
let player: Player

const camera = {
  position: {
    x: 0,
    y: 0,
  },
}

const init = () => {
  resize()
  setup()
}

const resize = () => {
  canvas.width = window.innerWidth * scale
  canvas.height = window.innerHeight * scale
}

const setup = () => {
  scene = new HenesysScene()
  player = new Player({
    canvas,
    gravity: scene.gravity,
    maxFallVelocity: scene.maxFallVelocity,
    position: { x: 0, y: 0 },
    imageSrc: 'https://via.placeholder.com/150',
    frame: { count: 1, buffer: 100 },
    scale: 1,
    collisions: scene.collisions,
    platforms: scene.platforms,
  })
}

let lastTime = 0
const draw = () => {
  const time = performance.now()
  const delta = time - lastTime
  lastTime = time

  if (imageLoader.isLoaded()) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.translate(-camera.position.x, -camera.position.y)

    scene.update(delta)
    scene.draw(ctx)

    player.update(delta)
    player.draw(ctx)

    player.updateHorizontalCameraBox(canvas, camera)
    player.updateVerticalCameraBox(canvas, camera)

    ctx.restore()
  }

  requestAnimationFrame(draw)
}

init()
draw()

window.addEventListener('resize', resize)
