'use strict';

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var constraints = {
  audio: true,
  video: false
};
var audioStream, audioOutStream;
var audioIn = document.getElementById('ainB');
var audioOut = document.getElementById('aoutB');
var inputLevelSelector = document.getElementById('inSel');
var outputLevelSelector = document.getElementById('outSel');
var startB = document.getElementById('startB');
var stopB = document.getElementById('stopB');
inputLevelSelector.addEventListener('change', changeMicrophoneLevel);
outputLevelSelector.addEventListener('change', changeSpeakerLevel);

startB.onclick = Start;
stopB.onclick = Stop;
var audioContext = new AudioContext()
var gainNode = audioContext.createGain();
var audioSource, audioDestination;
 

function processStream() {
    if(!audioStream) {
        return;
    }
    
    audioSource = audioContext.createMediaStreamSource( audioStream ),
    audioDestination = audioContext.createMediaStreamDestination();
    audioSource.connect(gainNode);
    gainNode.connect(audioDestination);

    audioOut.srcObject = audioDestination.stream;    

}

function Start() {
    navigator.mediaDevices.getUserMedia(constraints).
    then((stream) => {
        console.log('got stream', stream);
        audioStream = stream;
        audioIn.srcObject = stream;
    })
    .then(() => {
        processStream();
    })
    .catch((err) => {
        console.error('Unable to capture stream', err);
    })
    stopB.disabled = false;
    startB.disabled = true;
}

function Stop() {
    stopB.disabled = true;
    startB.disabled = false;
    if(audioStream) {
        audioStream.getTracks().forEach((track) => {
            track.stop();
        });
        audioStream = null;
    }
}

function changeMicrophoneLevel(e) {
    var value = e.target.value;
    if(value && value >= 0 && value <= 2) {
        gainNode.gain.value = value;
    }
}

function changeSpeakerLevel(e) {
    var value = e.target.value;
    if(value && value >= 0 && value <= 2) {
        audioOut.volume = value;
    }
}