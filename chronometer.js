const display = document.getElementById('chronometer-timer-display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

let interval = null;
let remainingMs = 0;
let previouseTime = 0;
let currentTime = 0;
let elapsedTime = 0;

const start = () => {
    if (interval) return; // Prevent multiple intervals
    previouseTime = performance.now();
    interval = setInterval(() => {
        currentTime = performance.now();
        elapsedTime = currentTime - previouseTime;
        previouseTime = currentTime;
        remainingMs += elapsedTime;
        displayTimer();
    }, 16); //for 60fps
}
const displayTimer = () => {
        const minutes = Math.floor((remainingMs / 1000 / 60) % 60);
        const seconds = Math.floor((remainingMs / 1000) % 60);
        const milliseconds = Math.floor(remainingMs % 1000);
        display.innerHTML =
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}:` +
            `${String(milliseconds).padStart(3, "0")}`;
}

const stop = () => {
    clearInterval(interval);
    interval = null;
}
const reset = () => {
    stop();
    remainingMs = 0;
    display.innerHTML = "00:00:000";
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);