import { Bodies } from 'matter-js'
import { TABLE_CATEGORY, BALL_CATEGORY, CUEBALL_CATEGORY, NONE_CATEGORY } from './collision'

const cushionOptions = {
  isStatic: true,
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

class Table {
  constructor () {
    this._createPhysicsObjects = this._createPhysicsObjects.bind(this)

    this.physicsObjects = this._createPhysicsObjects()
  }

  _createPhysicsObjects () {
    let cushionLeft = Bodies.rectangle(85, 300, 10, 320, cushionOptions)
    let cushionRight = Bodies.rectangle(715, 300, 10, 320, cushionOptions)
    let cushionTop = Bodies.rectangle(400, 145, 640, 10, cushionOptions)
    let cushionBottom = Bodies.rectangle(400, 455, 640, 10, cushionOptions)
    let base = Bodies.rectangle(400, 300, 640, 320, { isStatic: true, collisionFilter: { category: NONE_CATEGORY }, render: { fillStyle: '#046300' } })

    return [base, cushionBottom, cushionLeft, cushionRight, cushionTop]
  }
}

export default Table