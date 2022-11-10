import { loadSounds, soundBank } from "./loadSounds.js";
import { bootUpDisplay } from "./bootupdisplay.js";
import { volume, panning, delay, analyser } from "./audioEffects.js";
export const audioCtx = new AudioContext();

//instance of Audio API
audioCtx.connect(volume);
volume.connect(panning);
panning.connect(analyser);
analyser.connect(delay);
delay.connect(audioCtx.destination);

// pitch.connect(audioCtx.destination);
// pitchSlider.addEventListener('input', (e) => {
//     console.log(e.target.value);
//     pitch.detune.value = e.target.value;
//     console.log('PITCH VALUE', pitch.detune.value);
// });
// export const source = audioCtx.createBufferSource();

//ANALYSER
//This is used to create the analyser
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

const canvas = document.getElementById("oscilloscope");
const canvasCtx = canvas.getContext("2d");
let JamOn = false;

let currentDeck = loadSounds(soundBank[0].soundsArr);
function draw() {
    let colourArr = ["#F00", "#f80", "#ff0", "#0F0", "#0ff", "#00F", "#94f"];
    if (JamOn) {
        requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);
        // console.log({dataArray:dataArray})
        var style = getComputedStyle(document.body);
        canvasCtx.fillStyle = style.getPropertyValue("--screen-bg-color");
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
        canvasCtx.lineWidth = 2;
        // canvasCtx.strokeStyle =colourArr[Math.floor(Math.random()*colourArr.length)];
        canvasCtx.strokeStyle = dataArray.every((e) => {
            return e == 128;
        })
            ? "#fff"
            : colourArr[Math.floor(Math.random() * colourArr.length)];
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
    } else {
        canvasCtx.fillStyle = "rgb(0, 0, 0)";
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

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
    if (JamOn) {
        switch (key) {
            case "q":
                // console.log(currentDeck[0]);
                currentDeck[0].currentTime = 0;
                // currentDeck[0].src.playbackRate.value = 0.5;
                currentDeck[0].play();
                activateBorder(".drum-pad-1");
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
}

//on-LED function to light up
const onOffSwitch = document.getElementById("on-off-switch");
let dropdown = document.getElementById("dropdown");
const onLED = document.getElementById("on-LED");
const JAM = document.getElementById("jamdeck");
const dPad = document.querySelectorAll(".drum-pad");
onOffSwitch.addEventListener("click", (e) => {
    if (!onLED.classList.contains("turned-on")) {
        powerUp();
    } else {
        powerOff();
    }
});

function powerUp() {
    onLED.classList.add("turned-on");
    JAM.classList.add("jamdeck-on");
    dropdown.classList.add("d-turned-on");
    bootUpDisplay();
    document.getElementById(dropdown.value).classList.add("beat-turned-on");
    JamOn = true;
    draw();
    console.log(dPad);
    dPad.forEach((item) => {
        item.classList.add("active-pad");
    });
}

function powerOff() {
    onLED.classList.remove("turned-on");
    JAM.classList.remove("jamdeck-on");
    dropdown.classList.remove("d-turned-on");
    JamOn = false;
    document.getElementById(dropdown.value).classList.remove("beat-turned-on");
    dPad.forEach((item) => {
        item.classList.remove("active-pad");
    });
}

//beats loader
const beatsKnob = document.getElementById("beats-knob");
beatsKnob.addEventListener("input", (e) => {
    document.getElementById(dropdown.value).classList.remove("beat-turned-on");
    dropdown.value = soundBank[e.target.value].name;
    if (JamOn) {
        document.getElementById(dropdown.value).classList.add("beat-turned-on");
    }
    currentDeck = loadSounds(soundBank[e.target.value].soundsArr);
});
