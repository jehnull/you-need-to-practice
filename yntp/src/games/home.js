import { Application, Assets, Sprite, Container,Graphics } from "pixi.js";
import { notesGame } from "./notes.js";
import { chordsGame } from "./chords.js";
import { LayoutContainer } from '@pixi/layout/components';
import '@pixi/layout';

export async function homePage(app) {

    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
    const notes = await notesGame(app);
    const chords = await chordsGame(app);

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
        },
    });
    
    const cont = new LayoutContainer({
        layout: {
            height: '80%',
            width: '100%',
            overflow: 'scroll',
            flexDirection: 'row',
            backgroundColor: 0xff2020,
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
            width: '100%',  
            height: '110%',
            justifyContent: 'space-evenly',
            paddingTop: 50,
            alignItems: 'top',
            flexWrap: 'wrap',
        },
    });

    let page = '';

    const bunny = new Sprite({ texture, layout: true });
    bunny.width = 50;
    bunny.height = 50
    mainBodyCont.addChild(bunny);
    bunny.eventMode = 'static';
    bunny.cursor = 'pointer';
    bunny.on('pointerup', () => {
        app.stage.addChild(notes);
        app.stage.removeChild(parentCont);
    });

    const bunny2 = new Sprite({ texture, layout: true });
    bunny2.width = 70;
    bunny2.height = 70;
    mainBodyCont.addChild(bunny2);
    bunny2.eventMode = 'static';
    bunny2.cursor = 'pointer';
    bunny2.on('pointerup', () => {
        app.stage.addChild(chords);
        app.stage.removeChild(parentCont);
    });

    const bunny3 = new Sprite({ texture, layout: true });
    bunny3.width = 50;
    bunny3.height = 50;
    mainBodyCont.addChild(bunny3);
    bunny3.eventMode = 'static';
    bunny3.cursor = 'pointer';
    bunny3.on('pointerup', () => {
        console.log("3");
    });

    fullHomeScreenCont.addChild(titleBarCont);
    cont.addChild(mainBodyCont);

    parentCont.addChild(fullHomeScreenCont);
    parentCont.addChild(cont);

    app.stage.addChild(parentCont);    
}