import { Sprite } from "pixi.js";
import { ASSETS_PATH } from "../constants/assets-path.js";
export class Paddle {
  /**
   * Construct a paddle with a given position
   * @param {number} x - the x coordinate
   * @param {number} y - the y coordinate
   */
  constructor(x, y) {
    this.sprite = Sprite.from(ASSETS_PATH.paddle);
    if (!this.sprite) {
      throw new Error('Assets does not init!');
    }
    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5
    this.sprite.width = 100;
    this.sprite.height = 20;
    this.sprite.x = x;
    this.sprite.y = y;
  }

  /**
   * Move the paddle to the given x coordinate
   * @param {number} x - the new x coordinate
   */
  move(x) {
    this.sprite.x = x;
  }
}
