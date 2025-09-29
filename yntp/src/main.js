import { Application} from "pixi.js";
import { homePage } from "./games/home.js";
import '@pixi/layout';

(async () => {
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
})();
