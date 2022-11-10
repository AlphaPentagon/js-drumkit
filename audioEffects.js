import { audioCtx } from "./main.js";


export const volume = audioCtx.createGain();
export const panning = audioCtx.createPanner();
export const delay = audioCtx.createDelay(1);
export const analyser = audioCtx.createAnalyser();

const volumeKnob = document.getElementById("volume-knob");
volumeKnob.addEventListener("input", (e) => {
    console.log("Volume changed to: ", e.target.value);
    volume.gain.value = e.target.value;
});
const delaySlider = document.getElementById("slider1");
delaySlider.addEventListener("input", (e) => {
    console.log("Delay changed to: ", e.target.value);
    delay.delayTime.value = e.target.value;
});
const panningKnob = document.getElementById("panning-knob");
panningKnob.addEventListener("input", (e) => {
    console.log("Panning position changed to: ", e.target.value);
    panning.positionX.value = e.target.value;
});
panningKnob.addEventListener("dblclick", (e) => {
    console.log("Panning reset to middle!");
    e.target.value = 0;
    panning.positionX.value = e.target.value;
});
