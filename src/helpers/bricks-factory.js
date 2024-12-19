import { LEVELS } from "../constants/levels";
import { Brick } from "../entities/brick";

export class BricksFactory {

  /**
   * Creates and positions bricks for a given level.
   *
   * @param {number} x - The starting x-coordinate for the brick positioning.
   * @param {number} y - The starting y-coordinate for the brick positioning.
   * @param {number} level - The level index to determine the brick layout.
   * @returns {Array<Brick>} An array of Brick objects positioned according to the level layout.
   */

  create(x, y, level) {
    let initialX = x;
    let initialY = y;
    return LEVELS[level].flatMap((row) => {
      const bricksRow = row.map((el) => {
        if (el === null) {
          initialX += Brick.brickWidth;
          return null;
        }
        const brick = new Brick(el);
        brick.setPosition(initialX, initialY)
        initialX += Brick.brickWidth;
        return brick;
      }).filter((row) => row !== null);
      initialX = x;
      initialY += Brick.brickHeight;
      return bricksRow;
    });
  }
}
