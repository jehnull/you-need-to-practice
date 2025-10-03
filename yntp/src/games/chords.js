import { Assets, Text, TextStyle, Sprite } from "pixi.js";
import { LayoutContainer } from '@pixi/layout/components';
import '@pixi/layout';

export async function chordsGame(app, pushedNotesList) {

    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    const chordsGameParentContainer = new LayoutContainer({
        layout: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
            alignContent: 'center',
        },
    });

    const leftSideCont = new LayoutContainer({
        layout: {
            width: '50%',
            height: '100%', 
            backgroundColor: 0xFFFFFF,
            flexDirection: 'column',
            alignContent: 'center',
            padding: 20,
        },
    });

    const leftSideCont1 = new LayoutContainer({
        layout: {
            width: '100%',
            height: '5%',
            justifyContent: 'space-between'
        },
    });

    const bunny = new Sprite({ texture, layout: true });
    const bunny2 = new Sprite({ texture, layout: true });
    leftSideCont1.addChild(bunny, bunny2);

    const leftSideCont2 = new LayoutContainer({
        layout: {
            width: '100%',
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    const leftInstructionsStyle = new TextStyle({
        fontFamily: 'Pangolin, sans-serif',
        fill: 0x000000,
        align: 'center',
        fontSize: 20,
    });

    const leftInstructions = new Text({ text: "Play the note below.", style: leftInstructionsStyle });
    leftInstructions.layout = true;
    leftSideCont2.addChild(leftInstructions);

    const leftSideCont3 = new LayoutContainer({
        layout: {
            width: '100%',
            height: '75%',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    const leftStyleNote = new TextStyle({
        fontFamily: 'Pangolin, sans-serif',
        fill: 0x000000,
        align: 'center',
        fontSize: 200,
    });

    const leftNote = new Text({ text: "Cbm", style: leftStyleNote });
    leftNote.layout = true;
    leftSideCont3.addChild(leftNote);

    const leftSideCont4 = new LayoutContainer({
        layout: {
            width: '100%',
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center',   
        },
    });

    const leftStyleScore = new TextStyle({
        fontFamily: 'Pangolin, sans-serif',
        fill: 0x000000,
        align: 'center',
        fontSize: 20,
    });

    const leftScore = new Text({ text: "80/100", style: leftStyleScore });
    leftScore.layout = true;
    leftSideCont4.addChild(leftScore);

    leftSideCont.addChild(leftSideCont1);
    leftSideCont.addChild(leftSideCont2);
    leftSideCont.addChild(leftSideCont3);
    leftSideCont.addChild(leftSideCont4);

    const rightSideCont = new LayoutContainer({
        layout: {
            width: '50%',
            height: '95%',
            backgroundColor: 0x67a838,
            borderRadius: 8,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            margin: 20,
            padding: 20,
        },
    });

    const rightSideCont1 = new LayoutContainer({
        layout: {
            width: '100%',
            height: '15%',            
            justifyContent: 'center',
            alignItems: 'center',
            
        },
    });

    const rightSideCont2 = new LayoutContainer({
        layout: {
            width: '100%',
            height: '75%',
            justifyContent: 'center',
            alignItems: 'center',
            
        },
    });

    const rightSideCont3 = new LayoutContainer({
        layout: {
            width: '100%',
            height: '10%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            
        },
    });

    rightSideCont.addChild(rightSideCont1);
    rightSideCont.addChild(rightSideCont2);
    rightSideCont.addChild(rightSideCont3);

    const rightStyleTopText = new TextStyle({
        fontFamily: 'Pangolin, sans-serif',
        fill: 0xFFFFFF,
        align: 'center',
        fontSize: 50,
    });

    const rightSideTopText = new Text({ text: "CORRECT !", style: rightStyleTopText });
    rightSideTopText.layout = true;
    rightSideCont1.addChild(rightSideTopText);
    
    const rightStyleBottomText = new TextStyle({
        fontFamily: 'Pangolin, sans-serif',
        fill: 0xFFFFFF,
        fontSize: 30,
    });

    const rightSideBottomText = new Text({ text: "SKIP", style: rightStyleBottomText });
    rightSideBottomText.layout = true;
    rightSideCont3.addChild(rightSideBottomText);

    const rightStyleNotesText = new TextStyle({
        fontFamily: 'Pangolin, sans-serif',
        fill: 0xFFFFFF,
        align: 'center',
        wordWrap: true,
        fontSize: 200,
        anchor: 0.5,
    });

    const rightSideNotes = new Text(pushedNotesList);
    rightSideNotes.style = rightStyleNotesText;
    rightSideNotes.layout = true;
    rightSideCont2.addChild(rightSideNotes);

    app.ticker.add(() => {
        rightSideNotes.text = pushedNotesList;
    });

    chordsGameParentContainer.addChild(leftSideCont,rightSideCont);

    return chordsGameParentContainer;
}