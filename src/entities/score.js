import { Text } from "pixi.js";

export class Score {
  /**
   * Create a new Score.
   * @param {number} x - The x position of the score text.
   * @param {number} y - The y position of the score text.
   */
  constructor(x, y) {
    this.scoreText = new Text({
      text: 'Score: 0',
      style: {
        fontFamily: 'PixelifySans',
        fontSize: 20,
        fontWeight: 'bold',
        fill: '#ffffff',
      },
    });
    this.scoreText.position.set(x, y);
  }

  /**
   * Updates the score by adding the given amount.
   * @param {number} score - The amount to add to the score.
   */
  addScore(score) {
    const newScore = +this.scoreText.text.split(' ')[1] + score;
    this.scoreText.text = `Score: ${newScore}`;
  }

  resetScore() {
    this.scoreText.text = 'Score: 0';
  }
}
