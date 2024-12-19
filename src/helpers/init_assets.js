import { Assets } from "pixi.js";
import { ASSETS_PATH } from "../constants/assets-path";

export const initAssets = async () => {
  await Assets.load(ASSETS_PATH.brick.red);
  await Assets.load(ASSETS_PATH.brick.yellow);
  await Assets.load(ASSETS_PATH.brick.purple);
  await Assets.load(ASSETS_PATH.brick.orange);
  await Assets.load(ASSETS_PATH.brick.green);
  await Assets.load(ASSETS_PATH.brick.blue);
  await Assets.load(ASSETS_PATH.ball);
  await Assets.load(ASSETS_PATH.paddle);
  await Assets.load(ASSETS_PATH.background);
  await Assets.load(ASSETS_PATH.pixelifyFont);
  await Assets.load(ASSETS_PATH.sheep);
  await Assets.load(ASSETS_PATH.logo);
};
