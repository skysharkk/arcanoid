import { Application, applyMatrix } from "pixi.js"
import { Sheep } from "../entities/sheep";
import { TextButton } from "../entities/text-button";
import { Logo } from "../entities/logo";


export class MainScreen extends EventTarget {
  /**
   * Create a new MainScreen.
   * @param {Application} app - The Pixi.js Application.
   */
  constructor(app) {
    super();
    this.app = app;
    this.logo = new Logo(app.screen.width / 2, app.screen.height / 4);
    this.sheep = new Sheep();
    this.sheep.setPosition(app.screen.width / 2, app.screen.height / 2);
    this.sheep.sprite.play();
    this.startButton = new TextButton('Play', app.screen.width / 2, app.screen.height / 1.5);
    this.startButton.onClick = () => {
      this.dispatchEvent(new Event('play'));
    };
    this.startButton.text.anchor.x = 0.5;
    this.startButton.text.anchor.y = 0.5;
    this.startButton.text.style.fontSize = 50;
  }

  init() {
    this.app.stage.addChild(this.startButton.text);
    this.app.stage.addChild(this.sheep.sprite);
    this.app.stage.addChild(this.logo.logo);
  }

  unmount() {
    this.app.stage.removeChild(this.startButton.text);
    this.app.stage.removeChild(this.sheep.sprite);
    this.app.stage.removeChild(this.logo.logo);
  }
}
