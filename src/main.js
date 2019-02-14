import { Engine, Render, World, Mouse, Vector, Body } from 'matter-js'
import Ball from './physics/ball'
import Table from './physics/table'
import Cue from './physics/cue'

const engine = Engine.create()
engine.world.gravity.x = 0
engine.world.gravity.y = 0

const canvas = document.getElementById('canvas')
const render = Render.create({
  canvas,
  engine,
  options: {
    wireframes: false,
    background: '#046300'
  }
})

const blackPosX = 560
const blackPosY = 300
const ballRadius = 8

let blackBall = new Ball(560, 300, 'black')
let cueBall = new Ball(210, 300, 'white')

let redBalls = [
  new Ball(blackPosX - (2 * ballRadius), blackPosY - ballRadius, 'red'),
  new Ball(blackPosX - (4 * ballRadius), blackPosY, 'red'),
  new Ball(blackPosX, blackPosY + (2 * ballRadius), 'red'),
  new Ball(blackPosX + (2 * ballRadius), blackPosY - (3 * ballRadius), 'red'),
  new Ball(blackPosX + (2 * ballRadius), blackPosY + ballRadius, 'red'),
  new Ball(blackPosX + (4 * ballRadius), blackPosY - (2 * ballRadius), 'red'),
  new Ball(blackPosX + (4 * ballRadius), blackPosY + (4 * ballRadius), 'red')
]
let yellowBalls = [
  new Ball(blackPosX - (2 * ballRadius), blackPosY + ballRadius, 'yellow'),
  new Ball(blackPosX, blackPosY - (2 * ballRadius), 'yellow'),
  new Ball(blackPosX + (2 * ballRadius), blackPosY - ballRadius, 'yellow'),
  new Ball(blackPosX + (2 * ballRadius), blackPosY + (3 * ballRadius), 'yellow'),
  new Ball(blackPosX + (4 * ballRadius), blackPosY, 'yellow'),
  new Ball(blackPosX + (4 * ballRadius), blackPosY - (4 * ballRadius), 'yellow'),
  new Ball(blackPosX + (4 * ballRadius), blackPosY + (2 * ballRadius), 'yellow')
]

let cue = new Cue(200, 200)
let table = new Table()

World.add(engine.world, [
  ...table.physicsObjects,
  cueBall.physicsObject,
  cue.physicsObject,
  blackBall.physicsObject,
  ...redBalls.map(ball => ball.physicsObject),
  ...yellowBalls.map(ball => ball.physicsObject)
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
  } else if (![cueBall, blackBall, ...yellowBalls, ...redBalls].some(ball => ball.getSpeed() > 0.005)) {
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