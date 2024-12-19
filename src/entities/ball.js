import { Sprite } from "pixi.js";
import { ASSETS_PATH } from "../constants/assets-path";

export class Ball {
  /**
   * Construct a ball with a given initial position.
   * @param {number} x - the x coordinate
   * @param {number} y - the y coordinate
   */
  constructor(x, y) {
    this.sprite = Sprite.from(ASSETS_PATH.ball);
    if (!this.sprite) {
      throw new Error('Assets does not init!');
    }
    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5
    this.sprite.height = 20;
    this.sprite.width = 20;
    this.baseSpeed = 14;
    this.speed = {
      x: this.baseSpeed / 2,
      y: this.baseSpeed / 2,
    };
    this.sprite.x = x
    this.sprite.y = y
    this.isFlying = false;
  }

  /**
   * Move the ball to a new position defined by the given vector.
   * @param {number} x - the x coordinate
   * @param {number} y - the y coordinate
   */

  move(x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
  }

  /**
   * Updates the x component of the ball's speed.
   * @param {number} speed - the new x component of the ball's speed
   */
  updateSpeedX(speed) {
    this.speed.x = speed
  }

  /**
   * Updates the y component of the ball's speed.
   * @param {number} speed - the new x component of the ball's speed
   */
  updateSpeedY(speed) {
    this.speed.y = speed
  }

  flightBall() {
    if(this.isFlying) {
      this.move(this.sprite.x + this.speed.x, this.sprite.y + this.speed.y);
    }
  }

  startFlying() {
    this.isFlying = true;
  }

  /**
   * Stop the ball flying, setting the ball position to the given x and y
   * @param {number} x - the x coordinate
   * @param {number} y - the y coordinate
   */
  stopBallFlying(x, y) {
    this.isFlying = false
    this.move(x, y);
  }
}
