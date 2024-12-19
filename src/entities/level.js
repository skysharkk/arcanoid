import { Text } from "pixi.js";

export class Level {
  constructor(x, y) {
    this.levelText = new Text({
      text: 'level: 1',
      style: {
        fontFamily: 'PixelifySans',
        fontSize: 20,
        fontWeight: 'bold',
        fill: '#ffffff',
      },
    });
    this.levelText.position.set(x, y);
  }

  getLevel() {
    return +this.levelText.text.split(' ')[1];
  }

  setLevel(level) {
    this.levelText.text = `level: ${level}`;
  }
}
