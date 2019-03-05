import { Bodies } from 'matter-js'
import PhysicsObject from './physicsObject'

class Pocket extends PhysicsObject {
  _createPhysicsObject (x, y) {
    return Bodies.circle(x, y, 12, {
      isSensor: true,
      isStatic: true,
      render: {
        fillStyle: '#000000'
      },
      label: 'pocket'
    })
  }
}

export const createPockets = () => {
  return [
    new Pocket(80, 140),
    new Pocket(80, 460),
    new Pocket(400, 140),
    new Pocket(400, 460),
    new Pocket(720, 140),
    new Pocket(720, 460)
  ]
}