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

function playSound(key) {
    switch (key) {
        case 'q':
            kick.currentTime = 0;
            kick.play();
    }
}
