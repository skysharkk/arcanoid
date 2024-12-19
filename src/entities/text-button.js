import { Text } from "pixi.js";

export class TextButton {
  /**
   * Create a new TextButton.
   * @param {string} text - The text on the button.
   * @param {number} x - The x position of the button.
   * @param {number} y - The y position of the button.
   * @param {function} onClick - The function to call when the button is clicked.
   */
  constructor(text, x, y) {
    this.text = new Text({
      text: text,
      style: {
        fontFamily: 'PixelifySans',
        fontSize: 30,
        fontWeight: 'bold',
        fill: '#ffffff',
      },
    });
    this.text.eventMode = 'static';
    this.text.cursor = 'pointer';
    this.text.position.set(x, y);
    this.text.on('pointerover', () => {
      this.text.alpha = 0.5;
    });
    this.text.on('pointerout', () => {
      this.text.alpha = 1;
    });
    this.onClick = null;
    this.text.on('pointerdown', () => {
      if (this.onClick) {
        this.text.alpha = 1;
        this.onClick();
      }
    });
    this.text.on('pointerup', () => {
      this.text.alpha = 1;
    });
  }
}
