import { AnimatedSprite, Texture } from "pixi.js";
import { ASSETS_PATH } from "../constants/assets-path";

export class Brick {
  static brickWidth = 48;
  static brickHeight = 24;
  /**
   * Construct a brick with the given position
   * @param {('red' | 'yellow' | 'purple' | 'orange' | 'green' | 'blue')} color - color of the brick
   */
  constructor(color) {
    this.spritesheet = Texture.from(ASSETS_PATH.brick[color]);
    if (!this.spritesheet) {
      throw new Error('Assets does not init!');
    }
    this.sprite = new AnimatedSprite(this.spritesheet.animations.enemy);
    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5
    this.sprite.animationSpeed = 1;
    this.sprite.loop = false;
    this.sprite.width = Brick.brickWidth;
    this.sprite.height = Brick.brickHeight;
    this.score = 10;
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

  destroy() {
    this.sprite.play();
  }
}
