import { MAX_APP_WIDTH } from './constants/common';
import { GameScreen} from './containers/game-screen';
import { MainScreen } from './containers/main-screen';
import { initAssets } from './helpers/init_assets';
import './style.css'
import { Application } from 'pixi.js';

(async () => {
  const app = new Application();

  window.__PIXI_DEVTOOLS__ = {
    app
  };
  if (window.innerWidth < MAX_APP_WIDTH) {
    await app.init({ background: 'black', width: window.innerWidth, height: window.innerHeight });
  } else {
    await app.init({ background: 'black', height: window.innerHeight, width: MAX_APP_WIDTH });
  }
  document.body.appendChild(app.canvas);
  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;
  await initAssets();




  const gameScreen = new GameScreen(app, 0);
  const mainScreen = new MainScreen(app);

  mainScreen.addEventListener('play', () => {
    mainScreen.unmount();
    gameScreen.init();
  });

  gameScreen.addEventListener('back', () => {
    gameScreen.unmount();
    mainScreen.init();
  });

  mainScreen.init();





  // const onBack = () => {
  //   initMainScreen(app);
  // };

  // initMainScreen(app, () => initGameScreen(app, 0, () => initMainScreen(app, onBack)));
})();
