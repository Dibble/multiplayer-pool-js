import { Bodies, Vertices } from 'matter-js'
import { TABLE_CATEGORY, BALL_CATEGORY, CUEBALL_CATEGORY, NONE_CATEGORY } from './collision'

const cushionOptions = {
  isStatic: true,
  frictionStatic: 0,
  restitution: 1,
  collisionFilter: {
    category: TABLE_CATEGORY,
    mask: BALL_CATEGORY | CUEBALL_CATEGORY
  },
  render: {
    fillStyle: '#046300',
    lineWidth: 1
  }
}

const tableOptions = {
  isStatic: true,
  collisionFilter: {
    category: TABLE_CATEGORY,
    mask: BALL_CATEGORY | CUEBALL_CATEGORY
  },
  render: {
    fillStyle: '#402c25'
  }
}

class Table {
  constructor () {
    this._createPhysicsObjects = this._createPhysicsObjects.bind(this)

    this.physicsObjects = this._createPhysicsObjects()
  }

  _createPhysicsObjects () {
    const cushionLeft = Bodies.fromVertices(85, 300, Vertices.fromPath('0 0, 10 10, 10 280, 0 290'), cushionOptions)
    const cushionRight = Bodies.fromVertices(715, 300, Vertices.fromPath('0 0, 0 290, -10 280, -10 10'), cushionOptions)
    const cushionTopLeft = Bodies.fromVertices(245, 145, Vertices.fromPath('0 0, 290 0, 290 10, 10 10'), cushionOptions)
    const cushionTopRight = Bodies.fromVertices(555, 145, Vertices.fromPath('0 0, 290 0, 280 10, 0 10'), cushionOptions)
    const cushionBottomLeft = Bodies.fromVertices(245, 455, Vertices.fromPath('0 0, 10 -10, 290 -10, 290 0'), cushionOptions)
    const cushionBottomRight = Bodies.fromVertices(555, 455, Vertices.fromPath('0 0, 0 -10, 280 -10, 290 0'), cushionOptions)

    const tableLeft = Bodies.rectangle(70, 300, 20, 360, tableOptions)
    const tableRight = Bodies.rectangle(730, 300, 20, 360, tableOptions)
    const tableTop = Bodies.rectangle(400, 130, 650, 20, tableOptions)
    const tableBottom = Bodies.rectangle(400, 470, 650, 20, tableOptions)

    const base = Bodies.rectangle(400, 300, 640, 320, { isStatic: true, collisionFilter: { category: NONE_CATEGORY }, render: { fillStyle: '#046300' } })

    return [base, cushionBottomLeft, cushionBottomRight, cushionLeft, cushionRight, cushionTopLeft, cushionTopRight, tableLeft, tableRight, tableTop, tableBottom]
  }
}

export default Table