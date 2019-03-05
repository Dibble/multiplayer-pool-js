import { Body } from 'matter-js'

class PhysicsObject {
  constructor (x, y, colour) {
    this._createPhysicsObject = this._createPhysicsObject.bind(this)
    this.getPosition = this.getPosition.bind(this)
    this.setPosition = this.setPosition.bind(this)
    this.getSpeed = this.getSpeed.bind(this)
    this.setSpeed = this.setSpeed.bind(this)
    this.setAngle = this.setAngle.bind(this)
    this.setVisible = this.setVisible.bind(this)

    this.colour = colour

    this.physicsObject = this._createPhysicsObject(x, y, colour)
    this.id = this.physicsObject.id
  }

  getPosition () {
    return this.physicsObject.position
  }

  setPosition (newPosition) {
    Body.setPosition(this.physicsObject, { x: newPosition.x, y: newPosition.y })
  }

  getSpeed () {
    return this.physicsObject.speed
  }

  setSpeed (newSpeed) {
    this.physicsObject.setSpeed(newSpeed)
  }

  setAngle (newAngle) {
    Body.setAngle(this.physicsObject, newAngle)
  }

  setVisible (visible) {
    this.physicsObject.render.visible = visible
  }

  _createPhysicsObject () {
    throw new Error('_createPhysicsObject not defined in child class')
  }
}

export default PhysicsObject