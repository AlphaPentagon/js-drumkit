// grab the key to use as input
//on press, play sound
const kick = document.getElementById("kick");
const aahwwaahh = document.getElementById("aahwwaahh");
const awwyea = document.getElementById("awwyea");
const boww = document.getElementById("boww");
const clap = document.getElementById("clap");
const go = document.getElementById("go");
const hiHat = document.getElementById("hi-hat");
const snare = document.getElementById("snare");
const uhh = document.getElementById("uhh");

window.addEventListener("keydown", (e) => {
  playSound(e.key);
});

function playSound(key) {
  switch (key) {
    case "q":
      kick.currentTime = 0;
      kick.play();
      break;
    case "w":
      aahwwaahh.currentTime = 0;
      aahwwaahh.play();
      break;
    case "e":
      awwyea.currentTime = 0;
      awwyea.play();
      break;
    case "r":
      boww.currentTime = 0;
      boww.play();
      break;
    case "a":
      clap.currentTime = 0;
      clap.play();
      break;
    case "s":
      go.currentTime = 0;
      go.play();
      break;
    case "d":
      hiHat.currentTime = 0;
      hiHat.play();
      break;
    case "f":
      snare.currentTime = 0;
      snare.play();
      break;
    case "g":
      uhh.currentTime = 0;
      uhh.play();
      break;
    default:
      console.log("Invalid key");
  }
}
