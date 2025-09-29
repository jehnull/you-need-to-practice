import { Application, Assets, Sprite, Container,Graphics } from "pixi.js";
import { LayoutContainer } from '@pixi/layout/components';
import '@pixi/layout';

export async function homePage(app) {

    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    const parentCont = new Container({
        layout: {
            width: '100%',
            height: '100%',
            flexDirection: 'column',
        },
    });

    const fullHomeScreenCont = new LayoutContainer({
        layout: {
            height: '20%',
            width: '100%',
            flexDirection: 'row',
            backgroundColor: 0x202020,
            borderColor: 0xffffff,
            borderRadius: 12,
        },
    });
    
    const cont = new LayoutContainer({
        layout: {
            height: '80%',
            width: '100%',
            overflow: 'scroll',
            flexDirection: 'row',
            backgroundColor: 0xff2020,
            borderColor: 0xffffff,
            borderRadius: 12,
        },
    });

    const titleBarCont = new Container({
        layout: {
            width: '100%',  
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    const bunnyTitle = new Sprite({ texture, layout: true });
    titleBarCont.addChild(bunnyTitle);


    const mainBodyCont = new Container({
        layout: {
            width: '200%',  
            height: '200%',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 200,
            padding: 100,
        },
    });

    for (let i = 0; i < 10; i++) {
        const bunny = new Sprite({ texture, layout: true });
        mainBodyCont.addChild(bunny);
    }


    fullHomeScreenCont.addChild(titleBarCont);
    cont.addChild(mainBodyCont);

    parentCont.addChild(fullHomeScreenCont);
    parentCont.addChild(cont);

    app.stage.addChild(parentCont);

    return parentCont;
}