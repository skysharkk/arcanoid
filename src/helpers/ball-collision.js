import { Rectangle } from "pixi.js";
import { Ball } from "../entities/ball";
import { Paddle } from "../entities/paddle";
import { Brick } from "../entities/brick";

/**
 * Checks if the ball collides with the paddle or the screen and updates the direction of the ball accordingly.
 * @param {Ball} ball - the ball to check
 * @param {Paddle} paddle - the paddle to check
 * @param {Rectangle} screen - the screen dimensions
 * @param {{x: number, y: number}} offset - the screen offset
 */

export const checkBallCollision = (ball, paddle, screen, offset) => {
  const ballRadius = ball.sprite.width / 2;
  if (ball.sprite.x - ballRadius < offset.x || ball.sprite.x + ballRadius > screen.width - offset.x) {
    ball.updateSpeedX(-ball.speed.x);
  }

  if (ball.sprite.y - ballRadius < offset.y) {
    ball.updateSpeedY(-ball.speed.y);
  }

  if (
    ball.sprite.y + ballRadius >= paddle.sprite.y &&
    ball.sprite.y - ballRadius <= paddle.sprite.y - paddle.sprite.height / 2 &&
    ball.sprite.x > paddle.sprite.x - paddle.sprite.width / 2 &&
    ball.sprite.x < paddle.sprite.x + paddle.sprite.width / 2 &&
    ball.speed.y > 0
  ) {
    const relativeHitPoint = (ball.sprite.x - paddle.sprite.x) / (paddle.sprite.width / 2);
    const maxBounceAngle = Math.PI / 3;
    const bounceAngle = relativeHitPoint * maxBounceAngle;
    const speed = Math.sqrt(ball.speed.x ** 2 + ball.speed.y ** 2);
    ball.updateSpeedX(speed * Math.sin(bounceAngle));
    ball.updateSpeedY(-speed * Math.cos(bounceAngle));
    ball.sprite.y = paddle.sprite.y - ballRadius;
  }
};

/**
 * Checks if a ball is colliding with a brick and returns the direction of the bounce.
 * @param {Ball} ball - the ball to check
 * @param {Brick} brick - the brick to check
 * @returns {{ x?: number, y?: number } | null} - the direction of the bounce, or null if there is no collision
 */
export const getCollidingBrickDirection = (ball, brick) => {
  const brickHalfWidth = brick.sprite.width / 2;
  const brickHalfHeight = brick.sprite.height / 2;

  let brickLeft = brick.sprite.x - brickHalfWidth;
  let brickRight = brick.sprite.x + brickHalfWidth;
  let brickTop = brick.sprite.y - brickHalfHeight;
  let brickBottom = brick.sprite.y + brickHalfHeight;

  const ballRadius = ball.sprite.width / 2;

  if (
    ball.sprite.x - ballRadius < brickRight &&
    ball.sprite.x + ballRadius > brickLeft &&
    ball.sprite.y - ballRadius < brickBottom &&
    ball.sprite.y + ballRadius > brickTop
  ) {
    const overlapLeft = Math.abs(ball.sprite.x + ballRadius - brickLeft);
    const overlapRight = Math.abs(ball.sprite.x - ballRadius - brickRight);
    const overlapTop = Math.abs(ball.sprite.y + ballRadius - brickTop);
    const overlapBottom = Math.abs(ball.sprite.y - ballRadius - brickBottom);
    const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
    if (minOverlap === overlapTop) {
      return { y: -Math.abs(ball.speed.y) };
    } else if (minOverlap === overlapBottom) {
      return { y: Math.abs(ball.speed.y) }
    } else if (minOverlap === overlapLeft) {
      return { x: -Math.abs(ball.speed.x) };
    } else if (minOverlap === overlapRight) {
      return { x: Math.abs(ball.speed.x) };
    }
  }
  return null;
}

/**
 * Checks if a ball is colliding with any of the given bricks.
 * @param {Ball} ball - the ball to check
 * @param {Brick[]} bricks - the bricks to check
 *  @param {(score: number) => void} updateScore - update score callback
 * @returns {Brick | null} - destroyed brick
 */
export const checkCollidingBricks = (ball, bricks, updateScore) => {
  for (let i = bricks.length - 1; i >= 0; i--) {
    const brick = bricks[i];
    const direction = getCollidingBrickDirection(ball, brick);
    if (direction) {
      if (direction?.x === ball.speed.x) {
        break;
      }
      bricks.splice(i, 1);
      brick.destroy();
      updateScore(brick.score);
      if (direction?.y) {
        ball.updateSpeedY(direction?.y);
      }
      if (direction?.x) {
        ball.updateSpeedX(direction?.x);
      }
      break;
    }

  }
}
