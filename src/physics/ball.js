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
    this._createPhysicsObject = this._createPhysicsObject.bind(this)
    this.getPosition = this.getPosition.bind(this)
    this.getSpeed = this.getSpeed.bind(this)

    this.colour = colour

    this._physicsObject = this._createPhysicsObject(x, y)
  }

  getPosition () {
    return this._physicsObject.position
  }

  getSpeed () {
    return this._physicsObject.speed
  }

  _createPhysicsObject (x, y) {
    return Bodies.circle(x, y, this.colour === 'white' ? 7.5 : 8, {
      density: 0.001,
      frictionAir: 0.01,
      frictionStatic: 0.05,
      restitution: 1,
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