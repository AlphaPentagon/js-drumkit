//instance of Audio API
const audioCtx = new AudioContext();

//VOLUME
//this is used to alter the volume
const volume = audioCtx.createGain();
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
const panning = audioCtx.createPanner();
//this connects the panning effect to the output (speakers)
panning.connect(audioCtx.destination);
//link panning knob to panning effect
const panningKnob = document.getElementById('panning-knob');
panningKnob.addEventListener('input', (e) => {
    console.log(e.target.value);
    panning.positionX.value = e.target.value;
});

panningKnob.addEventListener('dblclick', (e) => {
    e.target.value = 0;
    panning.positionX.value = e.target.value;
});

//sounds
const kick = document.getElementById('kick');
const aahwwaahh = document.getElementById('aahwwaahh');
const awwyea = document.getElementById('awwyea');
const boww = document.getElementById('boww');
const clap = document.getElementById('clap');
const go = document.getElementById('go');
const hiHat = document.getElementById('hi-hat');
const snare = document.getElementById('snare');
const uhh = document.getElementById('uhh');
//sounds put into the Audio API
const kickSource = audioCtx.createMediaElementSource(kick);
const aahwwaahhSource = audioCtx.createMediaElementSource(aahwwaahh);
const awwyeaSource = audioCtx.createMediaElementSource(awwyea);
const bowwSource = audioCtx.createMediaElementSource(boww);
const clapSource = audioCtx.createMediaElementSource(clap);
const goSource = audioCtx.createMediaElementSource(go);
const hiHatSource = audioCtx.createMediaElementSource(hiHat);
const snareSource = audioCtx.createMediaElementSource(snare);
const uhhSource = audioCtx.createMediaElementSource(uhh);
//add volume and panning functions from API to sounds (FIXME: Chaining panning onto ONLY 1 source makes panning work on ALL sources)
kickSource.connect(volume).connect(panning);
aahwwaahhSource.connect(volume);
awwyeaSource.connect(volume);
bowwSource.connect(volume);
clapSource.connect(volume);
goSource.connect(volume);
hiHatSource.connect(volume);
snareSource.connect(volume);
uhhSource.connect(volume);

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

function activateBorder(className) {
    // Adds the "pressed" class to the clicked element, and remove it after 500ms. The class makes the element's outline "glow" neon pink
    let pad = document.querySelector(className);
    pad.classList.add('pressed');
    setTimeout(() => {
        pad.classList.remove('pressed');
    }, 500);
}

function playSound(key) {
    // Plays the sound corresponding to the specified key
    switch (key) {
        case 'q':
            kick.currentTime = 0;
            activateBorder('.drum-pad-1');
            kick.play();
            break;
        case 'w':
            aahwwaahh.currentTime = 0;
            aahwwaahh.play();
            activateBorder('.drum-pad-2');
            break;
        case 'e':
            awwyea.currentTime = 0;
            awwyea.volume = 0.3;
            awwyea.play();
            activateBorder('.drum-pad-3');
            break;
        case 'a':
            boww.currentTime = 0;
            boww.volume = 0.2;
            boww.play();
            activateBorder('.drum-pad-4');
            break;
        case 's':
            clap.currentTime = 0;
            clap.play();
            activateBorder('.drum-pad-5');
            break;
        case 'd':
            go.currentTime = 0;
            go.volume = 0.4;
            go.play();
            activateBorder('.drum-pad-6');
            break;
        case 'z':
            hiHat.currentTime = 0;
            hiHat.play();
            activateBorder('.drum-pad-7');
            break;
        case 'x':
            snare.currentTime = 0;
            snare.play();
            activateBorder('.drum-pad-8');
            break;
        case 'c':
            uhh.currentTime = 0;
            uhh.volume = 0.3;
            uhh.play();
            activateBorder('.drum-pad-9');
            break;
    }
}
