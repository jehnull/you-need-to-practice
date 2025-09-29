import { Assets, Sprite, Container } from "pixi.js";
import '@pixi/layout';

export async function chordsGame(app) {

    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    const chordsGameContainer = new Container({
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
    for (let i = 0; i < 10; i++) {
        // Create a bunny Sprite and enable layout
        // The width/height of the bunny will be the size of the texture by default
        const bunny = new Sprite({ texture, layout: true });

        // Add the bunny to the container
        chordsGameContainer.addChild(bunny);
    }

    // Listen for animate update
    app.ticker.add((time) => {
        // Rotating a container that is in layout will not cause the layout to be recalculated
        chordsGameContainer.rotation += 0.08 * time.deltaTime;
    });

    return chordsGameContainer;
}