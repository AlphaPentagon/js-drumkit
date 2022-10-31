// grab the key to use as input
//on press, play sound
const kick = document.getElementById('kick');
const aahwwaahh = document.getElementById('aahwwaahh');
const awwyea = document.getElementById('awwyea');
const boww = document.getElementById('boww');
const clap = document.getElementById('clap');
const go = document.getElementById('go');
const hiHat = document.getElementById('hi-hat');
const snare = document.getElementById('snare');
const uhh = document.getElementById('uhh');

window.addEventListener('keydown', (e) => {
    playSound(e.key);
});

window.addEventListener('click', (e) => {
    console.log(e.target.id);
    activateBorder(`.${e.target.classList[0]}`);
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
            kick.play();
            activateBorder('.drum-pad-1');
            break;
        case 'w':
            aahwwaahh.currentTime = 0;
            aahwwaahh.play();
            activateBorder('.drum-pad-2');
            break;
        case 'e':
            awwyea.currentTime = 0;
            awwyea.play();
            activateBorder('.drum-pad-3');
            break;
        case 'a':
            boww.currentTime = 0;
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
            uhh.play();
            activateBorder('.drum-pad-9');
            break;
        default:
            console.log('Invalid key');
    }
}
