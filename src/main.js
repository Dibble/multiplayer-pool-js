import { Engine, Render, World, Bodies, Mouse, Vector, Body } from 'matter-js'
import Ball from './physics/ball'
import { TABLE_CATEGORY, BALL_CATEGORY, CUEBALL_CATEGORY, CUE_CATEGORY } from './physics/collision'

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

let tableLeft = Bodies.rectangle(85, 300, 10, 320, { isStatic: true, restitution: 1, collisionFilter: { category: TABLE_CATEGORY, mask: BALL_CATEGORY | CUEBALL_CATEGORY } })
let tableRight = Bodies.rectangle(715, 300, 10, 320, { isStatic: true, restitution: 1, collisionFilter: { category: TABLE_CATEGORY, mask: BALL_CATEGORY | CUEBALL_CATEGORY } })
let tableTop = Bodies.rectangle(400, 145, 640, 10, { isStatic: true, restitution: 1, collisionFilter: { category: TABLE_CATEGORY, mask: BALL_CATEGORY | CUEBALL_CATEGORY } })
let tableBottom = Bodies.rectangle(400, 455, 640, 10, { isStatic: true, restitution: 1, collisionFilter: { category: TABLE_CATEGORY, mask: BALL_CATEGORY | CUEBALL_CATEGORY } })

const blackPosX = 560
const blackPosY = 300
const ballRadius = 8

let blackBall = new Ball('black', 560, 300)
let cueBall = new Ball('white', 210, 300)

let redBalls = [
  new Ball('red', blackPosX - (2 * ballRadius), blackPosY - ballRadius),
  new Ball('red', blackPosX - (4 * ballRadius), blackPosY),
  new Ball('red', blackPosX, blackPosY + (2 * ballRadius)),
  new Ball('red', blackPosX + (2 * ballRadius), blackPosY - (3 * ballRadius)),
  new Ball('red', blackPosX + (2 * ballRadius), blackPosY + ballRadius),
  new Ball('red', blackPosX + (4 * ballRadius), blackPosY - (2 * ballRadius)),
  new Ball('red', blackPosX + (4 * ballRadius), blackPosY + (4 * ballRadius))
]
let yellowBalls = [
  new Ball('yellow', blackPosX - (2 * ballRadius), blackPosY + ballRadius),
  new Ball('yellow', blackPosX, blackPosY - (2 * ballRadius)),
  new Ball('yellow', blackPosX + (2 * ballRadius), blackPosY - ballRadius),
  new Ball('yellow', blackPosX + (2 * ballRadius), blackPosY + (3 * ballRadius)),
  new Ball('yellow', blackPosX + (4 * ballRadius), blackPosY),
  new Ball('yellow', blackPosX + (4 * ballRadius), blackPosY - (4 * ballRadius)),
  new Ball('yellow', blackPosX + (4 * ballRadius), blackPosY + (2 * ballRadius))
]

let cue = Bodies.rectangle(200, 200, 150, 5, { restitution: 0, collisionFilter: { category: CUE_CATEGORY } })

World.add(engine.world, [
  tableLeft,
  tableRight,
  tableTop,
  tableBottom,
  cueBall._physicsObject,
  cue,
  blackBall._physicsObject,
  ...redBalls.map(ball => ball._physicsObject),
  ...yellowBalls.map(ball => ball._physicsObject)
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

    Body.setPosition(cue, { x: newCueVector.x, y: newCueVector.y })
    Body.setAngle(cue, cueAngle)
  } else if (![cueBall, blackBall, ...yellowBalls, ...redBalls].some(ball => ball.getSpeed() > 0.005)) {
    gameState = 'aim'
    cue.render.visible = true
  }
})
mouse.element.addEventListener('click', () => {
  if (gameState === 'aim') {
    let vectorDiff = Vector.sub(cueBall.getPosition(), cue.position)
    let normalisedDiff = Vector.normalise(vectorDiff)
    let force = Vector.mult(normalisedDiff, 0.006)

    Body.applyForce(cueBall._physicsObject, cue.position, force)
    gameState = 'shot'
    cue.render.visible = false
  }
})

Engine.run(engine)
Render.run(render)