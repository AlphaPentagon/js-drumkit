// grab the key to use as input
//on press, play sound

window.addEventListener('keydown', (e) => {
    playSound(e.key);
    switch (e.key) {
        case 'q':
            playSound();
    }
});

function playSound(key) {
    const audio = document.getElementById('kick');
    audio.currentTime = 0;
    audio.play();
}
