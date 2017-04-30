'use strict';

var constraints = {
  audio: true,
  video: false
};
var audioStream;
var audioIn = document.querySelector('audio#ainB');
var audioOut = document.querySelector('audio#aoutB');

var startB = document.querySelector('button#startB');
var stopB = document.querySelector('button#stopB');
startB.onclick = Start;
stopB.onclick = Stop;

function Start() {
    navigator.mediaDevices.getUserMedia(constraints).
    then((stream) => {
        console.log('got stream', stream);
        audioStream = stream;
    })
    .then(() => {

    })
    .catch((err) => {
        console.error('Unable to capture stream', err);
    })
}

function Stop() {
    if(audioStream) {
        audioStream.getTracks().forEach((track) => {
            track.stop();
        });
        audioStream = null;
    }
}