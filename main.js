import { loadSounds, nineties, breakbeat, soundBank } from './loadSounds.js';
import { bootUpDisplay } from './bootupdisplay.js';

//instance of Audio API
export const audioCtx = new AudioContext();

//VOLUME
//this is used to alter the volume
export const volume = audioCtx.createGain();
//this connects the volume effect to the output (speakers)
volume.connect(audioCtx.destination);
//link volume knob to volume effect
const volumeKnob = document.getElementById('volume-knob');
volumeKnob.addEventListener('input', (e) => {
  console.log(e.target.value);
  volume.gain.value = e.target.value;
});

//PANNING
//this is used to create the panning
export const panning = audioCtx.createPanner();
//this connects the panning effect to the output (speakers)
panning.connect(audioCtx.destination);
export const analyser = audioCtx.createAnalyser();

//DELAY
//this is used to create the reverb
export const delay = audioCtx.createDelay(1);
delay.connect(audioCtx.destination);
const delaySlider = document.getElementById('slider1');
delaySlider.addEventListener('input', (e) => {
  delay.delayTime.value = e.target.value;
  console.log(delay.delayTime);
});

//link panning knob to panning effect
const panningKnob = document.getElementById('panning-knob');
panningKnob.addEventListener('input', (e) => {
  console.log(e.target.value);
  panning.positionX.value = e.target.value;
});
// Double click to reset pan to neutral
panningKnob.addEventListener('dblclick', (e) => {
  e.target.value = 0;
  panning.positionX.value = e.target.value;
});

let currentDeck = loadSounds(nineties);

//ANALYSER
//This is used to create the analyser

analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

const canvas = document.getElementById('oscilloscope');
const canvasCtx = canvas.getContext('2d');
let JamOn = false;

function draw() {
  let colourArr = ['#F00', '#f80', '#ff0', '#0F0', '#0ff', '#00F', '#94f'];
  if (JamOn) {
    requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    // console.log({dataArray:dataArray})
    var style = getComputedStyle(document.body);
    canvasCtx.fillStyle = style.getPropertyValue('--screen-bg-color');
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtx.lineWidth = 2;
    // canvasCtx.strokeStyle =colourArr[Math.floor(Math.random()*colourArr.length)];
    canvasCtx.strokeStyle = dataArray.every((e) => {
      return e == 128;
    })
      ? '#fff'
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
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

window.addEventListener('keydown', (e) => {
  // Listen for a key press on the keyboard and play the sound assocaited with that key (if valid)
  if (audioCtx.state === 'suspended') {
    // Check that on keypress, there has been no user events on the page, and if not, then resume the audio
    audioCtx.resume();
  }
  playSound(e.key.toLowerCase());
});

window.addEventListener('mousedown', (e) => {
  // Listen for a click on the page, and play the sound asssociated with the clicked element
  if (audioCtx.state === 'suspended') {
    // Check that on keypress, there has been no user events on the page, and if not, then resume the audio
    audioCtx.resume();
  }
  console.log('what was clicked:', e.target.id);
  playSound(e.target.id);
});

export function activateBorder(className) {
  // Adds the "pressed" class to the clicked element, and remove it after 500ms. The class makes the element's outline "glow" neon pink
  let pad = document.querySelector(className);
  pad.classList.add('pressed');
  setTimeout(() => {
    pad.classList.remove('pressed');
  }, 500);
}

function playSound(key) {
  // Plays the sound corresponding to the specified key
  if (JamOn) {
    switch (key) {
      case 'q':
        currentDeck[0].currentTime = 0;
        currentDeck[0].play();
        activateBorder('.drum-pad-1');
        break;
      case 'w':
        currentDeck[1].currentTime = 0;
        currentDeck[1].play();
        activateBorder('.drum-pad-2');
        break;
      case 'e':
        currentDeck[2].currentTime = 0;
        currentDeck[2].volume = 0.3;
        currentDeck[2].play();
        activateBorder('.drum-pad-3');
        break;
      case 'a':
        currentDeck[3].currentTime = 0;
        currentDeck[3].volume = 0.2;
        currentDeck[3].play();
        activateBorder('.drum-pad-4');
        break;
      case 's':
        currentDeck[4].currentTime = 0;
        currentDeck[4].play();
        activateBorder('.drum-pad-5');
        break;
      case 'd':
        currentDeck[5].currentTime = 0;
        currentDeck[5].volume = 0.4;
        currentDeck[5].play();
        activateBorder('.drum-pad-6');
        break;
      case 'z':
        currentDeck[6].currentTime = 0;
        currentDeck[6].play();
        activateBorder('.drum-pad-7');
        break;
      case 'x':
        currentDeck[7].currentTime = 0;
        currentDeck[7].play();
        activateBorder('.drum-pad-8');
        break;
      case 'c':
        currentDeck[8].currentTime = 0;
        currentDeck[8].volume = 0.3;
        currentDeck[8].play();
        activateBorder('.drum-pad-9');
        break;
    }
  }
}

//on-LED function to light up
const onOffSwitch = document.getElementById('on-off-switch');
let dropdown = document.getElementById('dropdown');
const onLED = document.getElementById('on-LED');
const JAM = document.getElementById('jamdeck');
const dPad = document.querySelectorAll('.drum-pad');
onOffSwitch.addEventListener('click', (e) => {
  if (!onLED.classList.contains('turned-on')) {
    powerUp();
  } else {
    powerOff();
  }
});

function powerUp() {
  onLED.classList.add('turned-on');
  JAM.classList.add('jamdeck-on');
  dropdown.classList.add('d-turned-on');
  bootUpDisplay();
  document.getElementById(dropdown.value).classList.add('turned-on');
  JamOn = true;
  draw();
  console.log(dPad);
  dPad.forEach((item) => {
    item.classList.add('active-pad');
  });
}

function powerOff() {
  onLED.classList.remove('turned-on');
  JAM.classList.remove('jamdeck-on');
  dropdown.classList.remove('d-turned-on');
  JamOn = false;
  document.getElementById(dropdown.value).classList.remove('turned-on');
  dPad.forEach((item) => {
    item.classList.remove('active-pad');
  });
}

//beats loader
const beatsKnob = document.getElementById('beats-knob');
beatsKnob.addEventListener('input', (e) => {
  document.getElementById(dropdown.value).classList.remove('turned-on');
  dropdown.value = soundBank[e.target.value].name;
  if (JamOn) {
    document.getElementById(dropdown.value).classList.add('turned-on');
  }
  currentDeck = loadSounds(soundBank[e.target.value].soundsArr);
  //   soundBank[e.target.value].sourceLoaded = true
  console.log(dropdown.value);
});
