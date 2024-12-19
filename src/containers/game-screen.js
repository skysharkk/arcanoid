import { Application, Container, Text } from "pixi.js";
import { Paddle } from "../entities/paddle";
import { Ball } from "../entities/ball";
import { BG_PADDING, BRICKS_PADDING, INFO_FIELD_HEIGHT, PADDLE_PADDING } from "../constants/common";
import { LEVELS } from "../constants/levels";
import { Brick } from "../entities/brick";
import { checkBallCollision, checkCollidingBricks } from "../helpers/ball-collision";
import { BricksFactory } from "../helpers/bricks-factory";
import { BackgroundFactory } from "../helpers/background-factory";
import { TextButton } from "../entities/text-button";
import { Score } from "../entities/score";
import { Attempts } from "../entities/attempts";
import { Level } from "../entities/level";

export class GameScreen extends EventTarget {
  /**
   * Create a new GameScreen.
   * @param {Application} app - The Pixi.js Application.
   */
  constructor(app) {
    super();
    this.app = app;
    this.level = new Level(10, 30);
    this.PADDLE_Y_POS = app.screen.height - PADDLE_PADDING;
    this.paddle = new Paddle(app.screen.width / 2, this.PADDLE_Y_POS);
    this.ball = new Ball(app.screen.width / 2, this.PADDLE_Y_POS - this.paddle.sprite.height);
    this.score = new Score(10, 5);
    this.attempts = new Attempts(220, 10);
    this.backButton = new TextButton('Back', this.app.screen.width - 80, 10);
    this.backButton.onClick = () => {
      this.dispatchEvent(new Event('back'));
    };
    this.startButton = new TextButton('Start', this.app.screen.width / 2, this.app.screen.height / 1.7);
    this.startButton.onClick = () => {
      this.startGame();
    };
    this.startButton.text.anchor.x = 0.5;
    this.startButton.text.anchor.y = 0.5;
    this.startButton.text.style.fontSize = 50;

    this.retryButton = new TextButton('retry', this.app.screen.width / 2, this.app.screen.height / 1.7);
    this.retryButton.onClick = () => {
      this.retryGame();
    };
    this.retryButton.text.anchor.x = 0.5;
    this.retryButton.text.anchor.y = 0.5;
    this.retryButton.text.style.fontSize = 50;

    this.nextLevelButton = new TextButton('Next level', this.app.screen.width / 2, this.app.screen.height / 1.7);
    this.nextLevelButton.onClick = () => {
      this.changeLevel(this.level.getLevel() + 1);
      this.attempts.resetAttempts();
      this.app.stage.removeChild(this.nextLevelButton.text);
    };

    this.nextLevelButton.text.anchor.x = 0.5;
    this.nextLevelButton.text.anchor.y = 0.5;
    this.nextLevelButton.text.style.fontSize = 50;

    this.winText = new Text({
      text: 'You WIN!',
      style: {
        fontFamily: 'PixelifySans',
        fontSize: 50,
        fontWeight: 'bold',
        fill: '#ffffff',
      },
    });

    this.winText.anchor.x = 0.5;
    this.winText.anchor.y = 0.5;
    this.winText.position.set(this.app.screen.width / 2, this.app.screen.height / 2);

    this.gameOverText = new Text({
      text: 'Game Over',
      style: {
        fontFamily: 'PixelifySans',
        fontSize: 50,
        fontWeight: 'bold',
        fill: '#ffffff',
      },
    });

    this.gameOverText.anchor.x = 0.5;
    this.gameOverText.anchor.y = 0.5;
    this.gameOverText.position.set(this.app.screen.width / 2, this.app.screen.height / 2);

    this.attemptsBall = new Ball(200, 27);
    this.attemptsBall.sprite.scale.set(1.2);
    this.backgroundFactory = new BackgroundFactory();
    this.backgrounds = this.backgroundFactory.create(this.level.getLevel() - 1, this.app.screen);
    this.screenOffset = { x: BG_PADDING, y: BG_PADDING + INFO_FIELD_HEIGHT };
    this.bricksFactory = new BricksFactory();
    this.bricksStartX = (this.app.screen.width / 2) - ((LEVELS[this.level.getLevel() - 1].length + 1) * Brick.brickWidth / 2);
    this.bricksStartY = (Brick.brickHeight / 2) + BRICKS_PADDING;
    this.bricks = this.bricksFactory.create(this.bricksStartX, this.bricksStartY, this.level.getLevel() - 1);
  }

  startGame() {
    this.ball.startFlying();
    this.app.stage.removeChild(this.startButton.text);
  };

  retryGame() {
    this.reset();
    this.app.stage.removeChild(this.gameOverText);
    this.app.stage.removeChild(this.winText);
    this.app.stage.removeChild(this.retryButton.text);
  }

  platformMoveEvent = (e) => {
    if (e.global.x + this.paddle.sprite.width / 2 > this.app.screen.width - this.screenOffset.x) {
      this.paddle.move(this.app.screen.width - this.paddle.sprite.width / 2 - this.screenOffset.x);
      if (!this.ball.isFlying) {
        this.ball.move(this.app.screen.width - this.paddle.sprite.width / 2 - this.screenOffset.x, this.PADDLE_Y_POS - this.paddle.sprite.height)
      }
      return;
    }
    if (e.global.x - this.paddle.sprite.width / 2 <= this.screenOffset.x) {
      this.paddle.move(this.paddle.sprite.width / 2 + this.screenOffset.x);
      if (!this.ball.isFlying) {
        this.ball.move(this.paddle.sprite.width / 2 + this.screenOffset.x, this.PADDLE_Y_POS - this.paddle.sprite.height);
      }
      return;
    }
    if (!this.ball.isFlying) {
      this.ball.move(e.global.x, this.PADDLE_Y_POS - this.paddle.sprite.height);
    }
    this.paddle.move(e.global.x);
  }

  gameProcess = () => {
    const ballRadius = this.ball.sprite.width / 2;
    if (this.ball.sprite.y - ballRadius > this.app.screen.height) {
      this.ball.stopBallFlying(this.paddle.sprite.x, this.PADDLE_Y_POS - this.paddle.sprite.height);
      this.attempts.addAttempts(-1);
      this.score.addScore(-20);
      if (this.attempts.getAttempts() === 0) {
        this.app.stage.addChild(this.gameOverText);
        this.app.stage.addChild(this.retryButton.text);
      } else {
        this.app.stage.addChild(this.startButton.text);
      }
    }
    if (this.ball.isFlying) {
      checkCollidingBricks(this.ball, this.bricks, (scoreValue) => this.score.addScore(scoreValue));
      this.ball.flightBall();
      checkBallCollision(this.ball, this.paddle, this.app.screen, this.screenOffset);
      if (this.bricks.length === 0) {
        this.ball.stopBallFlying(this.paddle.sprite.x, this.PADDLE_Y_POS - this.paddle.sprite.height);
        if (this.level.getLevel() === LEVELS.length) {
          this.app.stage.addChild(this.winText);
          this.app.stage.addChild(this.retryButton.text);
        } else {
          this.app.stage.addChild(this.nextLevelButton.text);
        }
      }
    }
  }

  init() {
    this.app.stage.addChild(this.score.scoreText);
    this.app.stage.addChild(this.attempts.attemptsText);
    this.app.stage.addChild(this.attemptsBall.sprite);

    this.backgrounds.forEach((background) => {
      this.app.stage.addChild(background.sprite);
    });

    this.bricks.forEach((brick) => {
      this.app.stage.addChild(brick.sprite);
    });

    this.app.stage.addChild(this.paddle.sprite);
    this.app.stage.addChild(this.ball.sprite);
    this.app.stage.addChild(this.backButton.text);
    this.app.stage.addChild(this.startButton.text);
    this.app.stage.addChild(this.level.levelText);

    this.app.stage.addEventListener('pointermove', this.platformMoveEvent);
    this.app.ticker.add(this.gameProcess);
  };

  changeLevel(level) {
    this.level.setLevel(level);
    this.ball.stopBallFlying(this.paddle.sprite.x, this.PADDLE_Y_POS - this.paddle.sprite.height);
    this.backgrounds.forEach((background) => {
      this.app.stage.removeChild(background.sprite);
    });

    this.bricks.forEach((brick) => {
      this.app.stage.removeChild(brick.sprite);
    });
    this.backgrounds = this.backgroundFactory.create(this.level.getLevel() - 1, this.app.screen);
    this.bricks = this.bricksFactory.create(this.bricksStartX, this.bricksStartY, this.level.getLevel() - 1);
    this.backgrounds.forEach((background, idx) => {
      this.app.stage.addChildAt(background.sprite, idx);
    });
    this.bricks.forEach((brick) => {
      this.app.stage.addChild(brick.sprite);
    });
    this.app.stage.addChild(this.startButton.text);
  }

  reset() {
    this.changeLevel(1);
    this.score.resetScore();
    this.attempts.resetAttempts();
    this.ball.stopBallFlying(this.paddle.sprite.x, this.PADDLE_Y_POS - this.paddle.sprite.height);
  }

  unmount() {
    this.reset();
    this.app.stage.removeChild(this.score.scoreText);
    this.app.stage.removeChild(this.attempts.attemptsText);
    this.app.stage.removeChild(this.attemptsBall.sprite);

    this.backgrounds.forEach((background) => {
      this.app.stage.removeChild(background.sprite);
    });

    this.bricks.forEach((brick) => {
      this.app.stage.removeChild(brick.sprite);
    });

    this.app.stage.removeChild(this.paddle.sprite);
    this.app.stage.removeChild(this.ball.sprite);
    this.app.stage.removeChild(this.backButton.text);
    this.app.stage.removeChild(this.startButton.text);
    this.app.stage.removeChild(this.level.levelText);

    this.app.stage.removeListener('pointermove', this.platformMoveEvent);
    this.app.ticker.remove(this.gameProcess);
  }
}
