const video = document.getElementById('customVideo');
const videoContainer = document.getElementById('videoContainer');

let isForward = false;
let isBackward = false;
let forwardTimeout;
let backwardTimeout;

let forwardLongPress;
let backwardLongPress;

videoContainer.addEventListener('dblclick', handleDoubleClick);
videoContainer.addEventListener('mousedown', handleMouseDown);
videoContainer.addEventListener('mouseup', handleMouseUp);
videoInput.addEventListener('change', handleFileChange);

video.addEventListener('play', handlePlay);
video.addEventListener('pause', handlePause);

function handleDoubleClick(e) {
    const { clientX, target } = e;
    const rect = target.getBoundingClientRect();
    const clickPosition = clientX - rect.left;

    if (clickPosition > (2 * rect.width) / 3) {
        forwardBy10Sec();
    } else if (clickPosition < rect.width / 3) {
        backwardBy5Sec();
    } else {
        togglePlayPause();
    }
}
function handleFileChange(e) {
    const file = videoInput.files[0];
    const videoURL = URL.createObjectURL(file);
    video.src = videoURL;
}

function handleMouseDown(e) {
    const { clientX, target } = e;
    const rect = target.getBoundingClientRect();
    const clickPosition = clientX - rect.left;

    if (clickPosition > (2 * rect.width) / 3) {
        forwardLongPress = setTimeout(() => {
            forwardAt2x();
        }, 2000);
    } else if (clickPosition < rect.width / 3) {
        backwardLongPress = setTimeout(() => {
            backwardAt1x();
        }, 2000);
    }
}

function handleMouseUp() {
    clearTimeout(forwardLongPress);
    clearTimeout(backwardLongPress);
}

function handlePlay() {
    isPlaying = true;
}

function handlePause() {
    isPlaying = false;
}

function togglePlayPause() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function forwardBy10Sec() {
    video.currentTime += 10;
}

function backwardBy5Sec() {
    video.currentTime -= 5;
}

function forwardAt2x() {
    video.playbackRate = 2;
}

function backwardAt1x() {
    video.playbackRate = 1;
}

