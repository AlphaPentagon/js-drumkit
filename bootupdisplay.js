import { activateBorder } from './main.js';

export function bootUpDisplay() {
  bootborder('.drum-pad-1');
  setTimeout(function () {
    bootborder('.drum-pad-4');
    bootborder('.drum-pad-2');
  }, 200);
  setTimeout(function () {
    bootborder('.drum-pad-7');
    bootborder('.drum-pad-5');
    bootborder('.drum-pad-3');
  }, 400);
  setTimeout(function () {
    bootborder('.drum-pad-8');
    bootborder('.drum-pad-6');
  }, 600);
  setTimeout(function () {
    bootborder('.drum-pad-9');
  }, 1000);
  setTimeout(function () {
    activateBorder('.drum-pad-9');
  }, 1400);
  setTimeout(function () {
    activateBorder('.drum-pad-8');
    activateBorder('.drum-pad-6');
  }, 1600);
  setTimeout(function () {
    activateBorder('.drum-pad-7');
    activateBorder('.drum-pad-5');
    activateBorder('.drum-pad-3');
  }, 1800);
  setTimeout(function () {
    activateBorder('.drum-pad-4');
    activateBorder('.drum-pad-2');
  }, 2000);
  setTimeout(function () {
    activateBorder('.drum-pad-1');
  }, 2200);
  setTimeout(function () {
    activateBorder('.drum-pad-1');
    activateBorder('.drum-pad-2');
    activateBorder('.drum-pad-3');
    activateBorder('.drum-pad-4');
    activateBorder('.drum-pad-5');
    activateBorder('.drum-pad-6');
    activateBorder('.drum-pad-7');
    activateBorder('.drum-pad-8');
    activateBorder('.drum-pad-9');
  }, 2800);
}

function bootborder(className) {
  let pad = document.querySelector(className);
  pad.classList.add('boot-display');
  setTimeout(() => {
    pad.classList.remove('boot-display');
  }, 500);
}
