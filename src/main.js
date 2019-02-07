import { Engine, Render, World, Bodies, Mouse, Vector, Body } from 'matter-js'

const engine = Engine.create()
engine.world.gravity.x = 0
engine.world.gravity.y = 0

const render = Render.create({
  element: document.body,
  engine
})

const tableCategory = 0x0001
const ballCategory = 0x0002
const cueBallCategory = 0x0004
const cueCategory = 0x0008

let tableLeft = Bodies.rectangle(100, 300, 20, 420, { isStatic: true, restitution: 1, collisionFilter: { category: tableCategory, mask: ballCategory | cueBallCategory } })
let tableRight = Bodies.rectangle(700, 300, 20, 420, { isStatic: true, restitution: 1, collisionFilter: { category: tableCategory, mask: ballCategory | cueBallCategory } })
let tableTop = Bodies.rectangle(400, 100, 620, 20, { isStatic: true, restitution: 1, collisionFilter: { category: tableCategory, mask: ballCategory | cueBallCategory } })
let tableBottom = Bodies.rectangle(400, 500, 620, 20, { isStatic: true, restitution: 1, collisionFilter: { category: tableCategory, mask: ballCategory | cueBallCategory } })

let ball1 = Bodies.circle(400, 300, 10, { restitution: 0.75, collisionFilter: { category: ballCategory, mask: tableCategory | ballCategory | cueBallCategory } })
let ball2 = Bodies.circle(450, 300, 10, { restitution: 0.75, collisionFilter: { category: ballCategory, mask: tableCategory | ballCategory | cueBallCategory } })

let cueBall = Bodies.circle(200, 300, 9, { restitution: 0.75, collisionFilter: { category: cueBallCategory, mask: tableCategory | ballCategory } })
let cue = Bodies.rectangle(200, 200, 150, 5, { restitution: 0, collisionFilter: { category: cueCategory } })

World.add(engine.world, [tableLeft, tableRight, tableTop, tableBottom, ball1, ball2, cueBall, cue])

const mouse = Mouse.create(document.body)
mouse.element.addEventListener('mousemove', () => {
  let cueBallPosition = cueBall.position
  let mousePosition = mouse.position

  let vectorDiff = Vector.sub(cueBallPosition, mousePosition)
  let normalisedDiff = Vector.normalise(vectorDiff)
  let newCueVector = Vector.add(Vector.mult(normalisedDiff, -100), cueBallPosition)
  let cueAngle = Vector.angle(cueBallPosition, mousePosition)

  Body.setPosition(cue, { x: newCueVector.x, y: newCueVector.y })
  Body.setAngle(cue, cueAngle)
})
mouse.element.addEventListener('click', () => {
  let vectorDiff = Vector.sub(cueBall.position, cue.position)
  let normalisedDiff = Vector.normalise(vectorDiff)
  let force = Vector.mult(normalisedDiff, 0.02)

  Body.applyForce(cueBall, cue.position, force)
})

Engine.run(engine)
Render.run(render)