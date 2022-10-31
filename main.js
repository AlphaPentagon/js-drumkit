// grab the key to use as input
//on press, play sound
const kick = document.getElementById("kick");

window.addEventListener("keydown", (e) => {
  playSound(e.key);
});

function playSound(key) {
  switch (key) {
    case "q":
      kick.currentTime = 0;
      kick.play();
  }
}
