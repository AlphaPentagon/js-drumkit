// import { audioCtx } from './audioEffects';

// console.log('random');

// let test = document.getElementById('test');

// test.addEventListener('click', () => {
//     let stream = audioCtx.destination;
//     console.log('button clicked');
//     const recordedChunks = [];

//     console.log(stream);
//     const options = { mimeType: 'audio/mpeg;' };
//     const mediaRecorder = new MediaRecorder(stream, options);

//     mediaRecorder.ondataavailable = handleDataAvailable;
//     mediaRecorder.start();

//     function handleDataAvailable(event) {
//         console.log('data-available');
//         if (event.data.size > 0) {
//             recordedChunks.push(event.data);
//             console.log(recordedChunks);
//             download();
//         } else {
//             // …
//         }
//     }
//     function download() {
//         const blob = new Blob(recordedChunks, {
//             type: 'audio/mpeg',
//         });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         document.body.appendChild(a);
//         a.style = 'display: none';
//         a.href = url;
//         a.download = 'test.webm';
//         a.click();
//         window.URL.revokeObjectURL(url);
//     }

//     // demo: to download after 9sec
//     setTimeout((event) => {
//         console.log('stopping');
//         mediaRecorder.stop();
//     }, 9000);
// });
