import { Application, Assets, Sprite, Container } from "pixi.js";
import { homePage } from "./games/home.js";
import { notesGame } from "./games/notes.js";
import '@pixi/layout';

(async () => {
  // 
  const app = new Application();
  await app.init({ backgroundColor: 0x1099bb, resizeTo: window});
  document.getElementById("pixi-container").appendChild(app.canvas);

  app.ticker.add(() => {
    app.stage.layout = {
      width: app.screen.width,
      height: app.screen.height,
    };
  });

  // HOME PAGE
  const home = await homePage(app);
  app.stage.addChild(home);

  function onClick() {
    app.stage.removeChild(home);
    app.stage.addChild(notes);
  }

  home.eventMode = 'static';
  home.on('pointerdown', onClick);

  // GAME #1 : NOTES
  const notes = await notesGame(app);
  
  function onClick2() {
    app.stage.removeChild(notes);
    app.stage.addChild(home);
  }

  notes.eventMode = 'static';
  notes.on('pointerdown', onClick2);
})();
