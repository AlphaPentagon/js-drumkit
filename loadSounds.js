import { audioCtx, volume, panning, analyser } from './main.js';

export const nineties = [
    'kick',
    'aahwwaahh',
    'awwyea',
    'boww',
    'clap',
    'go',
    'hiHat',
    'snare',
    'uhh',
];

export function loadSounds(arr) {
    let sourcesArray = [];
    for (let i = 0; i < arr.length; i++) {
        let source = document.getElementById(arr[i]);
        audioCtx
            .createMediaElementSource(source)
            .connect(volume)
            .connect(panning)
            .connect(analyser);
        sourcesArray.push(source);
    }
    return sourcesArray;
}

//sounds
// const kick = document.getElementById('kick');
// const aahwwaahh = document.getElementById('aahwwaahh');
// const awwyea = document.getElementById('awwyea');
// const boww = document.getElementById('boww');
// const clap = document.getElementById('clap');
// const go = document.getElementById('go');
// const hiHat = document.getElementById('hiHat');
// const snare = document.getElementById('snare');
// const uhh = document.getElementById('uhh');
//sounds put into the Audio API
// const kickSource = audioCtx.createMediaElementSource(kick);
// const aahwwaahhSource = audioCtx.createMediaElementSource(aahwwaahh);
// const awwyeaSource = audioCtx.createMediaElementSource(awwyea);
// const bowwSource = audioCtx.createMediaElementSource(boww);
// const clapSource = audioCtx.createMediaElementSource(clap);
// const goSource = audioCtx.createMediaElementSource(go);
// const hiHatSource = audioCtx.createMediaElementSource(hiHat);
// const snareSource = audioCtx.createMediaElementSource(snare);
// const uhhSource = audioCtx.createMediaElementSource(uhh);
//add volume and panning functions from API to sounds (FIXME: Chaining panning onto ONLY 1 source makes panning work on ALL sources)
// kickSource.connect(volume).connect(panning);
// aahwwaahhSource.connect(volume);
// awwyeaSource.connect(volume);
// bowwSource.connect(volume);
// clapSource.connect(volume);
// goSource.connect(volume);
// hiHatSource.connect(volume);
// snareSource.connect(volume);
// uhhSource.connect(volume);
