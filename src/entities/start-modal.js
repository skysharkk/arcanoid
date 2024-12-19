import { Container, Graphics, Text } from "pixi.js";

export class StartModal {
  constructor(x, y, width, height) {
    this.onClick = null;
    this.text = new Text({
      text: 'Press to start', style: {
        fontFamily: 'PixelifySans',
        fontSize: 30,
        fontWeight: 'bold',
        fill: '#ffffff',
      },
    });

    this.text.anchor.x = 0.5;
    this.text.anchor.y = 0.5;

    this.substrate = new Graphics();
    this.substrate.rect(x, y, width, height);
    this.substrate.fill({ alpha: 0, color: 'white' });
    this.substrate.width = width;
    this.substrate.height = height;
    this.container = new Container();

    this.container.addChild(this.substrate);
    this.container.addChild(this.text);
    this.text.x = width / 2;
    this.text.y = height / 1.7;

    this.container.eventMode = 'static';
    this.container.cursor = 'pointer';

    this.container.on('pointerdown', () => {
      if (this.onClick) {
        this.onClick();
      }
    });
  }
}
