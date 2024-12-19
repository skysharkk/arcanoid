import { AnimatedSprite, Texture } from "pixi.js";
import { ASSETS_PATH } from "../constants/assets-path";

export class Sheep {
  constructor() {
    this.spritesheet = Texture.from(ASSETS_PATH.sheep);
    if (!this.spritesheet) {
      throw new Error('Assets does not init!');
    }
    this.sprite = new AnimatedSprite(this.spritesheet.animations.enemy);
    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5
    this.sprite.animationSpeed = 0.07;
  }

  /**
   * Set the position of the brick's animated sprite.
   * @param {number} x - The x coordinate.
   * @param {number} y - The y coordinate.
   */

  setPosition(x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
  }
}
