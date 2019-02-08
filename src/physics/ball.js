import { Bodies } from 'matter-js'
import { TABLE_CATEGORY, BALL_CATEGORY, CUEBALL_CATEGORY } from './collision'

const colours = {
  'white': '#FFF',
  'black': '#000',
  'red': '#FF0000',
  'yellow': '#FFFA00',
}

class Ball {
  constructor (colour, x, y) {
    this.createPhysicsObject = this.createPhysicsObject.bind(this)

    this.colour = colour

    this.physicsObject = this.createPhysicsObject(x, y)
  }

  createPhysicsObject (x, y) {
    return Bodies.circle(x, y, this.colour === 'white' ? 7.5 : 8, {
      density: 0.001,
      restitution: 0.75,
      collisionFilter: {
        category: BALL_CATEGORY,
        mask: TABLE_CATEGORY | BALL_CATEGORY | CUEBALL_CATEGORY
      },
      render: {
        fillStyle: colours[this.colour]
      }
    })
  }
}

export default Ball