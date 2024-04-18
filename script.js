import * as Tone from "https://cdn.skypack.dev/tone@14.7.77";

//synth declarations
let stopped = true;

const pannerA = new Tone.AutoPanner(0.239).toDestination().start();
const pannerB = new Tone.AutoPanner(0.091).toDestination().start();
const pannerC = new Tone.AutoPanner(0.387).toDestination().start();
const pannerD = new Tone.AutoPanner(0.148).toDestination().start();

const playerA = new Tone.Player("./assets/232hz2584ms.mp3").connect(pannerA);
const playerB = new Tone.Player("./assets/348hz4181ms.mp3").connect(pannerB);
const playerC = new Tone.Player("./assets/435hz6765ms.mp3").connect(pannerC);
const playerD = new Tone.Player("./assets/522hz10946ms.mp3").connect(pannerD);
const playerN = new Tone.Player("./assets/MasterNoise.mp3", () => {
  document.querySelector("#toggleButton").disabled = false;
}).connect(Tone.Master);

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

playerN.volume.value = -18;

document.querySelector("#pendulaSlider").addEventListener("input", (e) => {
  const val = parseInt(e.target.value);
  const options = [-24, -28, -12, -6, 0];

  playerA.volume.value = options[val];
  playerB.volume.value = options[val];
  playerC.volume.value = options[val];
  playerD.volume.value = options[val];

});

document.querySelector("#noiseSlider").addEventListener("input",(e) => {
  const val = parseInt(e.target.value);
  const options = [-36, -24, -18, -9, 0];

  playerN.volume.value = options[val];

});

document.querySelector("#toggleButton").addEventListener("click", (e) => {
  stopped = !stopped
  main();
});

function main() {
  //check if running or not
  if(!stopped) {
    playerA.start();
    playerB.start();
    playerC.start();
    playerD.start();
    playerN.start();
    document.getElementById("toggleButton").innerHTML = "<<<";
} else {
    playerA.stop();
    playerB.stop();
    playerC.stop();
    playerD.stop();
    playerN.stop();
    document.getElementById("toggleButton").innerHTML = ">>>";
}

}
