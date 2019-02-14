import { Bodies } from 'matter-js'
import { CUE_CATEGORY } from './collision'
import PhysicsObject from './physicsObject'

class Cue extends PhysicsObject {
  _createPhysicsObject (x, y) {
    return Bodies.rectangle(x, y, 150, 5, { restitution: 0, collisionFilter: { category: CUE_CATEGORY } })
  }
}

export default Cue