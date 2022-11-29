export const audioCtx = new AudioContext();
//instance of Audio API

export const volume = audioCtx.createGain();
export const panning = audioCtx.createPanner();
export const delay = audioCtx.createDelay(1);
export const analyser = audioCtx.createAnalyser();
export const distortion = audioCtx.createWaveShaper();
export let pitchShift = 1;
export let distortionShift = 0;

export function connectEffectsToSources(source) {
    source.connect(volume);
    volume.connect(panning);
    panning.connect(distortion);
    distortion.connect(analyser);
    analyser.connect(audioCtx.destination);
}

//DISTORTION
//used to create the distortion curve

function makeDistortionCurve(amount) {
    if (amount == 0) {
        return;
    }
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;

    for (let i = 0; i < n_samples; i++) {
        const x = (i * 2) / n_samples - 1;
        curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
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
const distortionSlider = document.getElementById('slider2');
distortionSlider.addEventListener('input', (e) => {
    console.log('Distortion changed to: ', e.target.value);
    distortion.curve = makeDistortionCurve(e.target.value);

    // distortion.oversample = '2x';
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
