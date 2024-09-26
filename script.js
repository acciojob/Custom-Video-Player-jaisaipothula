// Select the video element and controls
const video = document.querySelector('.video');
const playButton = document.querySelector('.player__button.toggle');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const volumeControl = document.querySelector('.volume');
const playbackSpeedControl = document.querySelector('.playback-speed');
const skipBackButton = document.querySelector('.skip-back');
const skipForwardButton = document.querySelector('.skip-forward');

// Toggle play and pause
function togglePlay() {
    if (video.paused || video.ended) {
        video.play();
    } else {
        video.pause();
    }
    updatePlayButton();
}

// Update play button text
function updatePlayButton() {
    playButton.textContent = video.paused ? '►' : '❚ ❚';
}

// Update progress bar
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
}

// Jump to specific time in the video
function jump(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Adjust volume
function adjustVolume() {
    video.volume = volumeControl.value;
}

// Adjust playback speed
function adjustPlaybackSpeed() {
    video.playbackRate = playbackSpeedControl.value;
}

// Skip back 10 seconds
function skipBack() {
    video.currentTime -= 10;
}

// Skip forward 25 seconds
function skipForward() {
    video.currentTime += 25;
}

// Event listeners
playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', jump);
volumeControl.addEventListener('input', adjustVolume);
playbackSpeedControl.addEventListener('input', adjustPlaybackSpeed);
skipBackButton.addEventListener('click', skipBack);
skipForwardButton.addEventListener('click', skipForward);

// Initialize volume and playback speed controls
volumeControl.value = video.volume;
playbackSpeedControl.value = video.playbackRate;

// Update duration display when metadata is loaded
video.addEventListener('loadedmetadata', () => {
    const durationDisplay = document.getElementById('duration');
    durationDisplay.textContent = formatTime(video.duration);
});

// Format time in mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}