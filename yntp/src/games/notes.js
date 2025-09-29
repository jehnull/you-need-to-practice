import { Assets, Sprite, Container } from "pixi.js";
import '@pixi/layout';

export async function notesGame(app) {

    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    const notesGameContainer = new Container({
        layout: {
            width: '50%',
            height: '50%',
            justifyContent: 'center',
            flexDirection: 'row',
            alignContent: 'center',
            flexWrap: 'wrap',
            gap: 4,
        },
    });

    // Create a grid of bunny sprites
    for (let i = 0; i < 100; i++) {
        // Create a bunny Sprite and enable layout
        // The width/height of the bunny will be the size of the texture by default
        const bunny = new Sprite({ texture, layout: true });

        // Add the bunny to the container
        notesGameContainer.addChild(bunny);
    }

    // Listen for animate update
    app.ticker.add((time) => {
        // Rotating a container that is in layout will not cause the layout to be recalculated
        notesGameContainer.rotation += 0.05 * time.deltaTime;
    });

    return notesGameContainer;
}