import { Bodies } from 'matter-js'
import { TABLE_CATEGORY, BALL_CATEGORY, CUEBALL_CATEGORY } from './collision'
import PhysicsObject from './physicsObject'

const colours = {
  'white': '#FFF',
  'black': '#000',
  'red': '#FF0000',
  'yellow': '#FFFA00',
}

class Ball extends PhysicsObject {
  _createPhysicsObject (x, y, colour) {
    return Bodies.polygon(x, y, 300, this.colour === 'white' ? 7.5 : 8, {
      density: 0.01,
      frictionAir: 0.002,
      frictionStatic: 0.05,
      restitution: 1,
      collisionFilter: {
        category: BALL_CATEGORY,
        mask: TABLE_CATEGORY | BALL_CATEGORY | CUEBALL_CATEGORY
      },
      render: {
        fillStyle: colours[colour]
      }
    })
  }
}

export default Ball