// grab the key to use as input
//on press, play sound
/*
doggy solution to the slider size issue
const sliderc = document.querySelector('.drum-slider-1');
const slider = document.getElementById('slider1');
slider.style.width = `${sliderc.clientHeight}px`;
*/

const audioCtx = new AudioContext();

const volume = audioCtx.createGain();

const slider1 = document.getElementById('slider1');
slider1.addEventListener('change', (e) => {
    console.log(e.target.value);
    volume.gain.value = e.target.value;
});

const kick = document.getElementById('kick');
const aahwwaahh = document.getElementById('aahwwaahh');
const awwyea = document.getElementById('awwyea');
const boww = document.getElementById('boww');
const clap = document.getElementById('clap');
const go = document.getElementById('go');
const hiHat = document.getElementById('hi-hat');
const snare = document.getElementById('snare');
const uhh = document.getElementById('uhh');

const source = audioCtx.createMediaElementSource(kick);

window.addEventListener('keydown', (e) => {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    playSound(e.key.toLowerCase());
});

window.addEventListener('click', (e) => {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    console.log('what was clicked:', e.target.id);
    playSound(e.target.id);
});

function activateBorder(className) {
    let pad = document.querySelector(className);
    pad.classList.add('pressed');
    setTimeout(() => {
        pad.classList.remove('pressed');
    }, 500);
}

function playSound(key) {
    switch (key) {
        case 'q':
            kick.currentTime = 0;

            activateBorder('.drum-pad-1');

            source.connect(volume);
            volume.connect(audioCtx.destination);
            kick.play();

            break;
        case 'w':
            aahwwaahh.currentTime = 0;
            aahwwaahh.volume = 0.5;
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
