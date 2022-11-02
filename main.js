import { loadSounds, nineties } from "./loadSounds.js";

//instance of Audio API
export const audioCtx = new AudioContext();

//VOLUME
//this is used to alter the volume
export const volume = audioCtx.createGain();
//this connects the volume effect to the output (speakers)
volume.connect(audioCtx.destination);
//link volume knob to volume effect
const volumeKnob = document.getElementById("volume-knob");
volumeKnob.addEventListener("input", (e) => {
    console.log(e.target.value);
    volume.gain.value = e.target.value;
});

//PANNING
//this is used to create the panning
export const panning = audioCtx.createPanner();
//this connects the panning effect to the output (speakers)
panning.connect(audioCtx.destination);
export const analyser = audioCtx.createAnalyser();
let currentDeck = loadSounds(nineties);

console.log(currentDeck[0]);

//link panning knob to panning effect
const panningKnob = document.getElementById("panning-knob");
panningKnob.addEventListener("input", (e) => {
    console.log(e.target.value);
    panning.positionX.value = e.target.value;
});
// Double click to reset pan to neutral
panningKnob.addEventListener("dblclick", (e) => {
    e.target.value = 0;
    panning.positionX.value = e.target.value;
});

//ANALYSER
//This is used to create the analyser

analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

const canvas = document.getElementById("oscilloscope");
const canvasCtx = canvas.getContext("2d");
function draw() {
    requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";
    canvasCtx.beginPath();
    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
    }
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
}
draw();

window.addEventListener("keydown", (e) => {
    // Listen for a key press on the keyboard and play the sound assocaited with that key (if valid)
    if (audioCtx.state === "suspended") {
        // Check that on keypress, there has been no user events on the page, and if not, then resume the audio
        audioCtx.resume();
    }
    playSound(e.key.toLowerCase());
});

window.addEventListener("mousedown", (e) => {
    // Listen for a click on the page, and play the sound asssociated with the clicked element
    if (audioCtx.state === "suspended") {
        // Check that on keypress, there has been no user events on the page, and if not, then resume the audio
        audioCtx.resume();
    }
    console.log("what was clicked:", e.target.id);
    playSound(e.target.id);
});

export function activateBorder(className) {
    // Adds the "pressed" class to the clicked element, and remove it after 500ms. The class makes the element's outline "glow" neon pink
    let pad = document.querySelector(className);
    pad.classList.add("pressed");
    setTimeout(() => {
        pad.classList.remove("pressed");
    }, 500);
}

function playSound(key) {
    // Plays the sound corresponding to the specified key
    switch (key) {
        case "q":
            currentDeck[0].currentTime = 0;
            activateBorder(".drum-pad-1");
            currentDeck[0].play();
            break;
        case "w":
            currentDeck[1].currentTime = 0;
            currentDeck[1].play();
            activateBorder(".drum-pad-2");
            break;
        case "e":
            currentDeck[2].currentTime = 0;
            currentDeck[2].volume = 0.3;
            currentDeck[2].play();
            activateBorder(".drum-pad-3");
            break;
        case "a":
            currentDeck[3].currentTime = 0;
            currentDeck[3].volume = 0.2;
            currentDeck[3].play();
            activateBorder(".drum-pad-4");
            break;
        case "s":
            currentDeck[4].currentTime = 0;
            currentDeck[4].play();
            activateBorder(".drum-pad-5");
            break;
        case "d":
            currentDeck[5].currentTime = 0;
            currentDeck[5].volume = 0.4;
            currentDeck[5].play();
            activateBorder(".drum-pad-6");
            break;
        case "z":
            currentDeck[6].currentTime = 0;
            currentDeck[6].play();
            activateBorder(".drum-pad-7");
            break;
        case "x":
            currentDeck[7].currentTime = 0;
            currentDeck[7].play();
            activateBorder(".drum-pad-8");
            break;
        case "c":
            currentDeck[8].currentTime = 0;
            currentDeck[8].volume = 0.3;
            currentDeck[8].play();
            activateBorder(".drum-pad-9");
            break;
    }
}
