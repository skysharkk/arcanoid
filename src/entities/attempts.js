import { Text } from "pixi.js";

export class Attempts {
  constructor(x, y) {
    this.attemptsText = new Text({
      text: 'x 3',
      style: {
        fontFamily: 'PixelifySans',
        fontSize: 30,
        fontWeight: 'bold',
        fill: '#ffffff',
      },
    });
    this.attemptsText.position.set(x, y);
  }

  getAttempts() {
    return +this.attemptsText.text.split(' ')[1];
  }

  addAttempts(attempts) {
    const newValue = this.getAttempts() + attempts;
    this.attemptsText.text = `x ${newValue}`;
  }

  resetAttempts() {
    this.attemptsText.text = 'x 3';
  }
}
