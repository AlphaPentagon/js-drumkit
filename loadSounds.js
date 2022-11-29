import { audioCtx, connectEffectsToSources } from './audioEffects.js';

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

export const breakbeat = [
    'breakbeat1',
    'breakbeat2',
    'breakbeat3',
    'breakbeat4',
    'breakbeat5',
    'breakbeat6',
    'breakbeat7',
    'breakbeat8',
    'breakbeat9',
];
export const soundBank = [
    { name: 'nineties', soundsArr: nineties, sourceLoaded: false },
    { name: 'breakbeat', soundsArr: breakbeat, sourceLoaded: false },
];
function connectNodeToSource(s) {
    // This function is named appropriately - Only gets called by loadSounds if source (which is a <audio> element) is not already connected to the audio context.
    connectEffectsToSources(audioCtx.createMediaElementSource(s));

    console.log('S', s);
    // loadSample(s.src).then((sample) => playSample(sample));
}

// async function loadSample(url) {
//     return await fetch(url)
//         .then((response) => response.arrayBuffer())
//         .then((buffer) => audioCtx.decodeAudioData(buffer));
// }

// export const pitchSlider = document.getElementById('slider2');

// pitchSlider.addEventListener('input', (e) => {
//     console.log(e.target.value);
//     source.playbackRate.value = e.target.value;
//     console.log('PITCH VALUE', source.playbackRate.value);
// });

// function playSample(sample) {
//     console.log(sample);
//     source.buffer = sample;
//     source.playbackRate.value = pitchSlider.value;
//     source.connect(audioCtx.destination);
// }

// function test(wav) {
//     console.log(typeof wav);
//     console.log(wav);
//     pitch.buffer = wav;
//     pitch.playbackRate.value = document.getElementById('slider2').value;
//     pitch.connect(audioCtx.destination);
// }

export function loadSounds(arr) {
    let soundBankIndex = soundBank.findIndex((elem) => {
        // Finds the index of the soundBank object which the argument arr matches (by the "soundsArr" key)
        return elem.soundsArr[0] == arr[0];
        // Compares the first entry of each obj in soundBank to the first entry in the arr parameter
    });
    let sourcesArray = [];
    for (let i = 0; i < arr.length; i++) {
        // Loops through the array of strings
        let source = document.getElementById(arr[i]);
        console.log({ source });
        // Selects the <audio> element that has that string as its id
        if (!soundBank[soundBankIndex].sourceLoaded) {
            // Check if the <audio> element has NOT already been conencted to the audio context
            connectNodeToSource(source);
            // Calls the function that connects the <audio> element to the audio context
        }
        sourcesArray.push(source);
        // Push each <audio> element to an array
    }
    soundBank[soundBankIndex].sourceLoaded = true;
    // Finally, sets the loaded key in soundBank to true - so that the <audio> element doesn't get connected again.
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
