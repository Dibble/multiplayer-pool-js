import { Bodies } from 'matter-js'
import { TABLE_CATEGORY, BALL_CATEGORY, CUEBALL_CATEGORY } from './collision'
import PhysicsObject from './physicsObject'

const colours = {
  'white': '#FFF',
  'black': '#000',
  'red': '#FF0000',
  'yellow': '#FFFA00',
}

export class Ball extends PhysicsObject {
  constructor (x, y, colour) {
    super(x, y, colour)

    this.potted = false
  }

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
      },
      slop: 0,
      label: `${colour} ball`
    })
  }
}

export const initialiseBalls = (cueBallPosition, blackPosition, ballRadius) => {
  let [blackPosX, blackPosY] = [blackPosition.x, blackPosition.y]

  let blackBall = new Ball(blackPosX, blackPosY, 'black')
  let cueBall = new Ball(cueBallPosition.x, cueBallPosition.y, 'white')

  let redBalls = [
    new Ball(blackPosX - (2 * ballRadius), blackPosY - ballRadius, 'red'),
    new Ball(blackPosX - (4 * ballRadius), blackPosY, 'red'),
    new Ball(blackPosX, blackPosY + (2 * ballRadius), 'red'),
    new Ball(blackPosX + (2 * ballRadius), blackPosY - (3 * ballRadius), 'red'),
    new Ball(blackPosX + (2 * ballRadius), blackPosY + ballRadius, 'red'),
    new Ball(blackPosX + (4 * ballRadius), blackPosY - (2 * ballRadius), 'red'),
    new Ball(blackPosX + (4 * ballRadius), blackPosY + (4 * ballRadius), 'red')
  ]
  let yellowBalls = [
    new Ball(blackPosX - (2 * ballRadius), blackPosY + ballRadius, 'yellow'),
    new Ball(blackPosX, blackPosY - (2 * ballRadius), 'yellow'),
    new Ball(blackPosX + (2 * ballRadius), blackPosY - ballRadius, 'yellow'),
    new Ball(blackPosX + (2 * ballRadius), blackPosY + (3 * ballRadius), 'yellow'),
    new Ball(blackPosX + (4 * ballRadius), blackPosY, 'yellow'),
    new Ball(blackPosX + (4 * ballRadius), blackPosY - (4 * ballRadius), 'yellow'),
    new Ball(blackPosX + (4 * ballRadius), blackPosY + (2 * ballRadius), 'yellow')
  ]

  return [cueBall, blackBall, ...redBalls, ...yellowBalls]
}