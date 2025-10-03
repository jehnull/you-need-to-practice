import { Application} from "pixi.js";
import { homePage } from "./games/home.js";
import '@pixi/layout';
import { Note, Chord } from "tonal";

(async () => {
  const app = new Application();
  await app.init({ backgroundColor: 0xFFFFFF, resizeTo: window});
  document.getElementById("pixi-container").appendChild(app.canvas);

  app.ticker.add(() => {
    app.stage.layout = {
      width: app.screen.width,
      height: app.screen.height,
    };
  });

  const pushedNotesList = [];

  // detect chord from list of notes
  function detectChord(pushedNotesList) {
    const detectedChord = Chord.detect(pushedNotesList);
    if (detectedChord.length == 0) {
      return pushedNotesList;
    }
    return detectedChord;
}

  navigator.requestMIDIAccess().then(MIDISuccess, MIDIFailure);

  async function MIDISuccess(midiAccess) {
    console.log("MIDI access granted!");

    // Get MIDI inputs
    const midiInputs = midiAccess.inputs;

    midiInputs.forEach((input) => {
      console.log(input);
      input.onmidimessage = handleMidiInput;
    });

    function handleMidiInput(input) {
      const command = input.data[0];
      const note = input.data[1];
      const velocity = input.data[2];

      switch (command) {
        case 144:
          if (velocity > 0) {
            noteOn(note, velocity);
          } else {
            noteOff(note);
          }
          break;
        case 128:
          noteOff(note);
          break;
      }
    }

    // note ON
    function noteOn(note, velocity) {
      const pushedNote = Note.fromMidi(note);
      console.log("PRESSED: ", pushedNote, velocity);

      pushedNotesList.push(pushedNote);
      console.log("PUSHED NOTES - on: ", detectChord(pushedNotesList));
   }

    // note OFF
    function noteOff(note) {
      const pushedNote = Note.fromMidi(note);
      console.log("RELEASED: ", pushedNote);

      pushedNotesList.splice(pushedNotesList.indexOf(pushedNote), 1);
      console.log("PUSHED NOTES - off: ", detectChord(pushedNotesList));
    }

    const fullCont = await homePage(app, pushedNotesList);
    app.stage.addChild(fullCont);
  }

  function MIDIFailure(error) {
    console.error("Failed to get MIDI access:", error);
  }

})();
