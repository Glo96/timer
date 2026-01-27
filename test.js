class Chronometer {
    constructor(displayId, startBtnId, stopBtnId, resetBtnId) {
        this.display = document.getElementById(displayId);
        this.startBtn = document.getElementById(startBtnId);
        this.stopBtn = document.getElementById(stopBtnId);
        this.resetBtn = document.getElementById(resetBtnId);

        this.interval = null;
        this.remainingMs = 0;
        this.previouseTime = 0;
        this.currentTime = 0;
        this.elapsedTime = 0;

        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());
    }

    start() {
        if (this.interval) return; // Prevent multiple intervals
        this.previouseTime = performance.now();
        this.interval = setInterval(() => {
            this.currentTime = performance.now();
            this.elapsedTime = this.currentTime - this.previouseTime;
            this.previouseTime = this.currentTime;
            this.remainingMs += this.elapsedTime;
            this.displayTimer();
        }, 16); //for 60fps
    }

    displayTimer() {
        const minutes = Math.floor((this.remainingMs / 60000) % 60);
        const seconds = Math.floor((this.remainingMs / 1000) % 60);
        const milliseconds = Math.floor(this.remainingMs % 1000);
        this.display.innerHTML =
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}:` +
            `${String(milliseconds).padStart(3, "0")}`;
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    reset() {
        this.stop();
        this.remainingMs = 0;
        this.display.innerHTML = "00:00:000";
    }
}
new Chronometer('chronometer-timer-display', 'startBtn', 'stopBtn', 'resetBtn');