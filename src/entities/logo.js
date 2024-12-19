import { Sprite } from "pixi.js";
import { ASSETS_PATH } from "../constants/assets-path";
/**
 * Constructor for Logo class.
 * @param {number} x - x coordinate where the logo will be placed
 * @param {number} y - y coordinate where the logo will be placed
 */
export class Logo {

  constructor(x, y) {
    this.logo = Sprite.from(ASSETS_PATH.logo);
    if (!this.logo) {
      throw new Error('Assets does not init!');
    }
    this.logo.anchor.x = 0.5
    this.logo.anchor.y = 0.5
    this.logo.scale.set(1.5);
    this.logo.x = x;
    this.logo.y = y;
  }
}
