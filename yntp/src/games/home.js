import { Assets, Sprite, Container } from "pixi.js";
import { chordsGame } from "./chords.js";
import { LayoutContainer } from '@pixi/layout/components';
import '@pixi/layout';

export async function homePage(app, pushedNotesList) {

    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
    const chords = await chordsGame(app, pushedNotesList);

    const homeCont = new LayoutContainer({
        layout: {
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            backgroundColor: 0x0000F0
        },
    });

    const titleBarCont = new LayoutContainer({
        layout: {
            height: '20%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 0x202020,
        },
    });
        
    const bodyCont = new LayoutContainer({
        layout: {
            height: '80%',
            width: '100%',
            overflow: 'scroll',
            flexDirection: 'row',
            backgroundColor: 0xff2020,
        },
    });

    const titleCont = new Container({
        layout: {
            width: '100%',  
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    const bunnyTitle = new Sprite({ texture, layout: true });
    titleCont.addChild(bunnyTitle);
    titleBarCont.addChild(titleCont);

    const body = new Container({
        layout: {
            width: '100%',  
            height: '110%',
            justifyContent: 'space-evenly',
            paddingTop: 50,
            alignItems: 'top',
            flexWrap: 'wrap',
        },
    });
    bodyCont.addChild(body);

    const bunny = new Sprite({ texture, layout: true });
    bunny.width = 50;
    bunny.height = 50;
    body.addChild(bunny);
    bunny.eventMode = 'static';
    bunny.cursor = 'pointer';
    bunny.on('pointerup', () => {
        app.stage.addChild(chords);
        app.stage.removeChild(homeCont);
    });

    
    const bunny2 = new Sprite({ texture, layout: true });
    bunny2.width = 70;
    bunny2.height = 70;
    body.addChild(bunny2);
    bunny2.eventMode = 'static';
    bunny2.cursor = 'pointer';
    // bunny2.on('pointerup', () => {
    //     //app.stage.addChild(chords);
    //     //app.stage.removeChild(parentCont);
    // });

    homeCont.addChild(titleBarCont, bodyCont);

    return homeCont;
}