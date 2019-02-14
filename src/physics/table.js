import { Bodies } from 'matter-js'
import { TABLE_CATEGORY, BALL_CATEGORY, CUEBALL_CATEGORY } from './collision'

class Table {
  constructor () {
    this._createPhysicsObjects = this._createPhysicsObjects.bind(this)

    this.physicsObjects = this._createPhysicsObjects()
  }

  _createPhysicsObjects () {
    let tableLeft = Bodies.rectangle(85, 300, 10, 320, { isStatic: true, restitution: 1, collisionFilter: { category: TABLE_CATEGORY, mask: BALL_CATEGORY | CUEBALL_CATEGORY } })
    let tableRight = Bodies.rectangle(715, 300, 10, 320, { isStatic: true, restitution: 1, collisionFilter: { category: TABLE_CATEGORY, mask: BALL_CATEGORY | CUEBALL_CATEGORY } })
    let tableTop = Bodies.rectangle(400, 145, 640, 10, { isStatic: true, restitution: 1, collisionFilter: { category: TABLE_CATEGORY, mask: BALL_CATEGORY | CUEBALL_CATEGORY } })
    let tableBottom = Bodies.rectangle(400, 455, 640, 10, { isStatic: true, restitution: 1, collisionFilter: { category: TABLE_CATEGORY, mask: BALL_CATEGORY | CUEBALL_CATEGORY } })

    return [tableBottom, tableLeft, tableRight, tableTop]
  }
}

export default Table