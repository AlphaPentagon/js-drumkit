export const audioCtx = new AudioContext();
//instance of Audio API

export const volume = audioCtx.createGain();
export const panning = audioCtx.createPanner();
export const delay = audioCtx.createDelay(1);
export const analyser = audioCtx.createAnalyser();
export let pitchShift = 1;

export function connectEffectsToSources(source) {
    source.connect(volume);
    volume.connect(panning);
    panning.connect(analyser);
    analyser.connect(audioCtx.destination);
}

const volumeKnob = document.getElementById('volume-knob');
volumeKnob.addEventListener('input', (e) => {
    console.log('Volume changed to: ', e.target.value);
    volume.gain.value = e.target.value;
});
const pitchSlider = document.getElementById('slider1');
pitchSlider.addEventListener('input', (e) => {
    console.log('Pitch changed to: ', e.target.value);
    pitchShift = e.target.value;
});

const panningKnob = document.getElementById('panning-knob');
panningKnob.addEventListener('input', (e) => {
    console.log('Panning position changed to: ', e.target.value);
    panning.positionX.value = e.target.value;
});
panningKnob.addEventListener('dblclick', (e) => {
    console.log('Panning reset to middle!');
    e.target.value = 0;
    panning.positionX.value = e.target.value;
});
