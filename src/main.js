import { Engine, Render, World, Mouse, Vector, Body } from 'matter-js'
import { initialiseBalls } from './physics/ball'
import { createPockets } from './physics/pocket'
import Table from './physics/table'
import Cue from './physics/cue'

global.decomp = require('poly-decomp')

const engine = Engine.create()
engine.world.gravity.x = 0
engine.world.gravity.y = 0

const canvas = document.getElementById('canvas')
const render = Render.create({
  canvas,
  engine,
  options: {
    wireframes: false,
    background: '#2f2a46'
  }
})

let [cueBall, ...balls] = initialiseBalls({ x: 210, y: 300 }, { x: 560, y: 300 }, 8)
let cue = new Cue(200, 200)
let table = new Table()
let pockets = createPockets()

World.add(engine.world, [
  ...table.physicsObjects,
  ...balls.map(ball => ball.physicsObject),
  cueBall.physicsObject,
  cue.physicsObject,
  ...pockets.map(p => p.physicsObject)
])

let gameState = 'aim'

const mouse = Mouse.create(canvas)
mouse.element.addEventListener('mousemove', () => {
  if (gameState === 'aim') {
    let cueBallPosition = cueBall.getPosition()
    let mousePosition = mouse.position

    let vectorDiff = Vector.sub(cueBallPosition, mousePosition)
    let normalisedDiff = Vector.normalise(vectorDiff)
    let newCueVector = Vector.add(Vector.mult(normalisedDiff, -100), cueBallPosition)
    let cueAngle = Vector.angle(cueBallPosition, mousePosition)

    cue.setPosition({ x: newCueVector.x, y: newCueVector.y })
    cue.setAngle(cueAngle)
  } else if ([cueBall, ...balls].every(ball => ball.getSpeed() <= 0.005)) {
    gameState = 'aim'
    cue.setVisible(true)
  }
})
mouse.element.addEventListener('click', () => {
  if (gameState === 'aim') {
    let vectorDiff = Vector.sub(cueBall.getPosition(), cue.getPosition())
    let normalisedDiff = Vector.normalise(vectorDiff)
    let force = Vector.mult(normalisedDiff, 0.04)

    Body.applyForce(cueBall.physicsObject, cue.getPosition(), force)
    gameState = 'shot'
    cue.setVisible(false)
  }
})

Engine.run(engine)
Render.run(render)