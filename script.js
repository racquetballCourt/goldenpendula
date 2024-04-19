import * as Tone from "https://cdn.skypack.dev/tone@14.7.77";

//create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

//start audio context
audioContext.resume();

//set tone.js to new audio context
Tone.setContext(audioContext);

//synth declarations
let stopped = true;
//lfo-controlled stereo pan devices for each pendulum player
const pannerA = new Tone.AutoPanner(0.239).toDestination().start();
const pannerB = new Tone.AutoPanner(0.091).toDestination().start();
const pannerC = new Tone.AutoPanner(0.387).toDestination().start();
const pannerD = new Tone.AutoPanner(0.148).toDestination().start();
//create each pendulum player and connect to respective pan device
const playerA = new Tone.Player("./assets/232hz2584ms.mp3").connect(pannerA);
const playerB = new Tone.Player("./assets/348hz4181ms.mp3").connect(pannerB);
const playerC = new Tone.Player("./assets/435hz6765ms.mp3").connect(pannerC);
const playerD = new Tone.Player("./assets/522hz10946ms.mp3").connect(pannerD);
//create noise player, wait for buffer load to enable start/stop button
const playerN = new Tone.Player("./assets/MasterNoise.mp3", () => {
  document.querySelector("#toggleButton").disabled = false;
}).connect(Tone.Master);
//don't start players automatically; loop audio playback
playerA.autostart = false;
playerB.autostart = false;
playerC.autostart = false;
playerD.autostart = false;
playerN.autostart = false;
playerA.loop = true;
playerB.loop = true;
playerC.loop = true;
playerD.loop = true;
playerN.loop = true;
//reduce initial volume for noise
playerN.volume.value = -18;
//handle pendula volume slider, map input value [0-4] to db value [options]
document.querySelector("#pendulaSlider").addEventListener("input", (e) => {
  const val = parseInt(e.target.value);
  const options = [-24, -18, -12, -6, 0];

  playerA.volume.value = options[val];
  playerB.volume.value = options[val];
  playerC.volume.value = options[val];
  playerD.volume.value = options[val];

});
//handle noise volume slider, map input value [0-4] to db value [options]
document.querySelector("#noiseSlider").addEventListener("input",(e) => {
  const val = parseInt(e.target.value);
  const options = [-24, -21, -18, -15, -12];

  playerN.volume.value = options[val];

});

//when button is clicked, invert 'stopped' value and call main function
document.querySelector("#toggleButton").addEventListener("click", (e) => {
  stopped = !stopped
  main();
});

function main() {
  //check running state
  if(!stopped) {
    //start all players
    playerA.start();
    playerB.start();
    playerC.start();
    playerD.start();
    playerN.start();
    //change button display
    document.getElementById("toggleButton").innerHTML = "<<<";
} else {
    //stop all players
    playerA.stop();
    playerB.stop();
    playerC.stop();
    playerD.stop();
    playerN.stop();
    //change button display
    document.getElementById("toggleButton").innerHTML = ">>>";
}

}
