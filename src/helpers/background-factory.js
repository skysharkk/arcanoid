import { Rectangle } from "pixi.js";
import { INFO_FIELD_HEIGHT } from "../constants/common";
import { Background } from "../entities/background";

export class BackgroundFactory {
  /**
   * Creates a series of background layers to fill the screen height.
   * @param {number} level - The level for which backgrounds are created.
   * @param {Rectangle} screen - The screen object containing the height and width.
   * @returns {Background[]} An array of Background objects filling the screen height.
   */

  create(level, screen) {
    const hiddenSpace = 110;
    let filledHeight = INFO_FIELD_HEIGHT;
    const backgrounds = [];
    while (screen.height - INFO_FIELD_HEIGHT > filledHeight) {
      const background = new Background(0, filledHeight, screen.width, level);
      backgrounds.push(background);
      filledHeight += (background.sprite.height - hiddenSpace);
    }
    return backgrounds.reverse();
  }
}
