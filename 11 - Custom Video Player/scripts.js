const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.maximize__button');

function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
};

function updateButton() {
    if(this.paused) {
        toggle.textContent = '▶';
    } else {
        toggle.textContent = '❚ ❚';
    }
};

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
};

function handleRangeUpdate() {
    video[this.name] = this.value;
};

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

let mousedown = false;
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function goBig() {
    if (!video.fullScreenElement) {
        video.requestFullscreen();
    } else {
        video.exitFullscreen()
    }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousedown', () => mousedown = true);
fullScreen.addEventListener('click', goBig);