class MiniTimer {
    constructor(container) {
        this.container = container;
        this.newDiv;
        this.display;
        this.inputSec;
        this.inputMin
        this.startButton;
        this.stopButton;
        this.resetButton;
        this.removeButton;
        this.divForInput;

        this.interval = null;

        this.remainingMs = 0;

        // =========== CREATE DOM ELEMENTS ============

        this.newDiv = document.createElement("div")
        Object.assign(this.newDiv, {
            className: "timer-div"
        })

        // Timer Display
        this.display = document.createElement("h1")
        Object.assign(this.display, {
            id: "timer-display",
            className: "timer-display"
        })
        const displayCounter = ""
        this.display.append(displayCounter);

        // Input Field type number
        this.divForInput = document.createElement("div")
        Object.assign(this.newDiv, {
            className: "input-div"
        })
        this.inputSec = document.createElement("input")
        Object.assign(this.inputSec, {
            id: "timer-input",
            type: "number",
            placeholder: "Seconds",
            // value: 7
        })
        this.inputMin = document.createElement("input")
        Object.assign(this.inputMin, {
            id: "timer-input",
            type: "number",
            placeholder: "Minutes",
            // value: 7
        })

        // Start Button
        this.startButton = document.createElement("button");
        Object.assign(this.startButton, {
            id: "startBtn",
            className: "btn start-button",
        })
        const textForStartBtn = document.createTextNode("Start")
        this.startButton.appendChild(textForStartBtn)
        // Stop button
        this.stopButton = document.createElement("button")
        Object.assign(this.stopButton, {
            id: "stopBtn",
            className: "btn stop-button"
        })
        const textForStopBtn = document.createTextNode("Stop");
        this.stopButton.appendChild(textForStopBtn);

        // Reset Button
        this.resetButton = document.createElement("button");
        Object.assign(this.resetButton, {
            id: "resetBtn",
            className: "btn reset-button"
        })
        const textForResetBtn = document.createTextNode("Reset");
        this.resetButton.appendChild(textForResetBtn);

        //Remove Button
        this.removeButton = document.createElement("button");
        Object.assign(this.removeButton, {
            id: "removeBtn",
            className: "btn remove-button"
        });
        const textForRemoveBtn = document.createTextNode("X");
        this.removeButton.appendChild(textForRemoveBtn);


        // add elements to container and to body
        this.divForInput.append(this.inputMin, this.inputSec)// TODO:    fix the style. divForInput dooes not contain the correct elements. Check web page elements.
        this.newDiv.append(this.display, this.divForInput, this.startButton, this.stopButton, this.resetButton, this.removeButton);
        this.container.append(this.newDiv);

        // Event Listeners
        this.startButton.addEventListener("click", () => {
            this.start();
        });
        this.stopButton.addEventListener("click", () => {
            this.stop();
        })
        this.resetButton.addEventListener("click", () => {
            this.reset();
        })
        this.removeButton.addEventListener("click", () => {
            this.remove();
        })

        this._displayTimer();
    }

    // =========================== METHODS =================================
    start() {
        // Disable input field only if the timer is running;
        if ((this.inputSec.value === "" && this.inputMin.value === "") || (this.inputSec.value <= 0 && this.inputMin.value <= 0)) {
            this.reset()
            return
        } else if ((this.inputSec.value !== "" && this.inputMin.value !== "")) {
            this.inputSec.disabled = true;
            this.inputMin.disabled = true;
        }
        this.inputMin.value = Number(this.inputMin.value);
        this.inputSec.value = Number(this.inputSec.value);
        
        //Prevents start button spam
        if (this.interval !== null) return;
        // Can not enter negative number or NaN into the input field
        if (this.inputSec.value < 0 || this.inputSec.value === NaN || this.inputMin.value < 0 || this.inputMin.value === NaN) {
            this.reset();
            return;
        }

        let userMs; 
        // timer continues from where it has been stopped  
        if (this.remainingMs > 0) {
            userMs = this.remainingMs;
        } else userMs = (this.inputSec.value * 1000) + (this.inputMin.value * 60000);

        const startTime = performance.now();
        this.interval = setInterval(() => {
            const elapsedMs = performance.now() - startTime;
            this.remainingMs = userMs - elapsedMs;
            if (this.remainingMs <= 0) {
                this.inputSec.disabled = false;
                this.inputMin.disabled = false;
                this.stop();
                this.display.innerHTML = "00:00:000";
                document.getElementById("alarm-sound").play();  
            } else {
                this._displayTimer();
            }
        }, 1);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
        console.log("Timer has stopped");
        document.getElementById("sync-timers").disabled = false;
    }

    reset() {
        this.remainingMs = 0;
        this.stop();
        console.log("Timer has been reset");
        this.inputSec.value = "";
        this.inputMin.value = "";
        this._displayTimer();
        this.inputSec.disabled = false
        this.inputMin.disabled = false
    }

    _displayTimer() {
        const totalSeconds = Math.floor(this.remainingMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor(this.remainingMs % 1000);
        this.display.innerHTML =
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}:` +
            `${String(milliseconds).padStart(3, "0")}`;
    }

    remove() {
        this.newDiv.remove();
    }

    sync() {
        this.remainingMs = Math.floor((this.remainingMs / 1000)) * 1000;
        if (this.interval) {
            this.stop()
            this.start()
            document.getElementById("sync-timers").disabled = true;
        }
        this._displayTimer()
    }
}
const container = document.getElementById("timers");
// BUTTONS
const addButton = document.getElementById("add-timer");
const startAllBtn = document.getElementById("all-start");
const stopAllBtn = document.getElementById("all-stop");
const resetAllBtn = document.getElementById("all-reset");
const removeAllBtn = document.getElementById("all-delete");
const syncAllBtn = document.getElementById("sync-timers")
// Display the timer on web page load is working.

document.addEventListener("DOMContentLoaded", () => {
    timers.push(new MiniTimer(container));
})
let timers = []
//array with timers for the start-all button

//Event listeners to the global buttons
addButton.addEventListener("click", () => {
    timers.push(new MiniTimer(container));
})
startAllBtn.addEventListener("click", () => {
    for (const timer of timers) {
        timer.start();
    }
})
stopAllBtn.addEventListener("click", () => {
    for (const timer of timers) {
        timer.stop();
    }
})
resetAllBtn.addEventListener("click", () => {
    for (const timer of timers) {
        timer.reset();
    }
})
removeAllBtn.addEventListener("click", () => {
    for (const timer of timers) {
        timer.remove();
    }
})
syncAllBtn.addEventListener("click", () => {
    for (const timer of timers) {
        timer.sync()
    }
})

