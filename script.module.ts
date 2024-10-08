import MyPlayer from '@classes/Player/MyPlayer/MyPlayer.module.js'
import HenesysRegion from '@classes/Region/HenesysRegion/HenesysRegion.module.js'
import Region from '@classes/Region/Region.module.js'
import Camera from 'src/libs/Camera/Camera.module.js'
import { IControls } from 'src/libs/Controls/Controls.interface'
import GameCameraControls from 'src/libs/Controls/GameCameraControls/GameCameraControls.module.js'
import imageLoader from 'src/libs/Loader/ImageLoader/ImageLoader.module.js'
import Renderer from 'src/libs/Renderer/Renderer.module.js'
import Scene from 'src/libs/Scene/Scene.module.js'

const scale = window.devicePixelRatio || 1

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const background = document.getElementById('background') as HTMLImageElement
const bgm = document.getElementById('bgm') as HTMLAudioElement

let renderer: Renderer
let scene: Scene
let camera: Camera
let controls: IControls

let region: Region

const init = () => {
  resize()
  setup()
}

const resize = () => {
  canvas.width = window.innerWidth * scale
  canvas.height = window.innerHeight * scale

  if (camera) {
    camera.width = canvas.width
    camera.height = canvas.height
  }
}

const setup = () => {
  renderer = new Renderer(canvas)

  scene = new Scene()

  camera = new Camera({
    width: canvas.width,
    height: canvas.height,
  })
  scene.add(camera)

  region = new HenesysRegion()
  region.terrain.forEach((terrain) => scene.add(terrain))
  region.boundaries.forEach((boundary) => scene.add(boundary))

  const player = new MyPlayer({
    position: [100, 800],
    maxWidth: region.width,
    maxHeight: region.height,
    gravity: region.gravity,
    maxFallSpeed: region.maxFallSpeed,
  })

  region.terrain.forEach((terrain) => {
    if (terrain.collisionBlock.type === 'box') {
      player.obstacles.push(terrain)
    } else if (terrain.collisionBlock.type === 'platform') {
      player.platforms.push(terrain)
    }
  })
  region.boundaries.forEach((boundary) => {
    player.obstacles.push(boundary)
  })

  scene.add(player)

  background.src = region.backgroundSrc
  bgm.src = region.bgmSrc

  controls = new GameCameraControls({
    object: player,
    canvas,
    camera,
    boundary: {
      top: 0,
      right: region.width,
      bottom: region.height,
      left: 0,
    },
  })
}

let lastTime = 0
const draw = () => {
  const time = performance.now()
  const delta = time - lastTime
  lastTime = time

  if (delta > 1000) return

  if (imageLoader.isLoaded) {
    scene.traverse((object) => object.update(delta))
    renderer.render(scene, camera)
    controls.update(delta)
  }

  requestAnimationFrame(draw)
}

init()
draw()

window.addEventListener('resize', resize)
