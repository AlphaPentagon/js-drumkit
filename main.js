// grab the key to use as input
//on press, play sound
const audio = document.getElementById("kick");

window.addEventListener("keydown", (e) => {
  playSound(e.key);
});

function playSound(key) {
  audio.currentTime = 0;
  audio.play();
}
