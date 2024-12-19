import { Sprite } from "pixi.js";
import { ASSETS_PATH } from "../constants/assets-path.js";
export class Background {
  /**
   * Construct a background with a given position
   * @param {number} x - the x coordinate
   * @param {number} y - the y coordinate
   * @param {number} width - the bg width
   * @param {number} level - the bg level
   */
  constructor(x, y, width, level) {
    this.sprite = Sprite.from(ASSETS_PATH.background[level]);
    if (!this.sprite) {
      throw new Error('Assets does not init!');
    }
    this.ratio = this.sprite.height / this.sprite.width;
    this.sprite.width = width;
    this.sprite.height = width / this.ratio;
    this.sprite.x = x;
    this.sprite.y = y;
  }
}
