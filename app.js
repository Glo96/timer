let interval = [];
let counter = [];
   
const startTimer = (event) => {
    const startBtnID = event.target.id;
    const timerID = parseInt(startBtnID);
    const inputID = `${timerID}-timer-input`;

    // Initialize Counter if it's 0 or less
    if (counter[timerID] <= 0) {
        counter[timerID] = document.getElementById(inputID).value;
        counter[timerID] = Math.floor(counter[timerID] * 1000)
    }
    // TODO: Alert for invalid input. Can not be empty or less than 0 or not a number.
    if (counter[timerID] <= 0) {
        return;
        // alert("Please enter a valid number.")
        // return
    }

    // Guard Clause For Start Button Spam
    event.target.disabled = true;
    document.getElementById("all-start").disabled = true
    displayTimer(timerID); 

    // Set Interval 
    interval[timerID] = setInterval(() => {
        counter[timerID] -= 10;
        console.log("Hi I am an interval and I am still working...");
        
        // Timer Display Update
        displayTimer(timerID)
        
        // Clear/Stop Interval if the timer reaches 0;
        if (counter[timerID] <= 0) {
            document.getElementById("alarm-sound").play();
            stopTimer(event)
        }
    }, 10)
}

const displayTimer = (timerID) => {
    const totalSecondsElapsed = counter[timerID];

    const hours = Math.floor(totalSecondsElapsed / 3600000);
    const minutes = Math.floor((totalSecondsElapsed % 3600000) / 60000);
    const seconds = Math.floor((totalSecondsElapsed % 60000) / 1000);
    const milliseconds = totalSecondsElapsed % 1000;

    const timerDisplayID = `${timerID}-timer-display`;

    document.getElementById(timerDisplayID).innerHTML =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}:` +
        `${String(milliseconds).padStart(3, "0")}`;
};

    
const stopTimer = (event) => {
    const stopBtnID = event.target.id;
    
    const timerID = parseInt(stopBtnID);
    clearInterval(interval[timerID]);
    document.getElementById(`${timerID}-startBtn`).disabled = false;
    
    //if all counter values are 0 then enable the start all button 
    let isZero = true;
    for (let i = 0; i < counter.length; i++) {
        const element = counter[i];
        if (element !== 0) isZero = false
        
    }
    document.getElementById("all-start").disabled = !isZero;
     
}

const resetTimer = (event) => {
    const resetBtnID = event.target.id;
    const timerID = parseInt(resetBtnID);
    const timerDisplayID = `${timerID}-timer-display`;
    const inputID = `${timerID}-timer-input`;
    
    clearInterval(interval[timerID]);
    counter[timerID] = 0;
    document.getElementById(timerDisplayID).innerHTML = "00:00:00:00";
    document.getElementById(`${timerID}-startBtn`).disabled = false;
    document.getElementById(inputID).value = "";
}

const removeDiv = (event) => {
    const removeBtnID = event.target.id;
    const timerID = parseInt(removeBtnID);
    const timerDivID = `${timerID}-timer-div`;
    const timerDiv = document.getElementById(timerDivID);
     stopTimer(event)
    timerDiv.remove();
}    

// ======================================= Global Functions ==================================
const syncAllTimers = () => {
    const arrayWithBtnClassNames = document.querySelectorAll(".start-button");
    
    for (let i = 0; i < arrayWithBtnClassNames.length; i++) {
        const timerIndex = parseInt(arrayWithBtnClassNames[i].id);

        clearInterval(interval[timerIndex]);
        if (counter[timerIndex] != 0) {
            startTimer({target: {id: `${timerIndex}-startBtn`}});
        }
    }
}

const startAll = () => {
    const allBtnClassNames = document.querySelectorAll(".start-button")
    for (let i = 0; i < allBtnClassNames.length; i++) {
        const timerIndex = parseInt(allBtnClassNames[i].id);
        startTimer({target: {id: `${timerIndex}-startBtn`}});
    }
    
}

const stopAll = () => {
    const allBtnClassNames = document.querySelectorAll(".start-button")
    for (let i = 0; i < allBtnClassNames.length; i++) {
        const timerIndex = parseInt(allBtnClassNames[i].id);
        stopTimer({target: {id: `${timerIndex}-startBtn`}});
    }
    document.getElementById("all-start").disabled = false;
}

const resetAll = () => {
    const allBtnClassNames = document.querySelectorAll(".start-button")
    for (let i = 0; i < allBtnClassNames.length; i++) {
        const timerIndex = parseInt(allBtnClassNames[i].id);
        resetTimer({target: {id: `${timerIndex}-startBtn`}});
    }
}

const removeAll = () => {
    const allBtnClassNames = document.querySelectorAll(".start-button")
    for (let i = 0; i < allBtnClassNames.length; i++) {
        const timerIndex = parseInt(allBtnClassNames[i].id);
        removeDiv({target: {id: `${timerIndex}-startBtn`}});
    }
}
// =============================== ADD NEW TIMER FUNCTION ===============================
let idIndex = 0;
const addNewTimer = () => {
    counter.push(0);
    interval.push(0);
    // Div element
    const newDiv = document.createElement("div");
    Object.assign(newDiv, {
        id: `${idIndex}-timer-div`,
        className: "timer-div",
    });
   

    const timerDisplay = document.createElement("h1");
    const timerDisplayText = "00:00:00";
    timerDisplay.id = `${idIndex}-timer-display`;
    timerDisplay.className = "timer-display";
    timerDisplay.append(timerDisplayText);

    // Input Field type number
    const inputField = document.createElement("input");
    Object.assign(inputField, {
        type: "number",
        id: `${idIndex}-timer-input`,
        className: "input-field",
        placeholder: "Enter duration in seconds",
    })
    
    // Start Button
    const startBtn = document.createElement("button")
    Object.assign(startBtn, {
        id: `${idIndex}-startBtn`,
        className: "btn start-button",
    })
    const textForStartBtn = document.createTextNode("▶")
    startBtn.appendChild(textForStartBtn)

    // Stop Button
    const stopBtn = document.createElement("button")
    Object.assign(stopBtn, {
        id: `${idIndex}-stopBtn`,
        className: "btn stop-button",
    })
    const textForStopBtn = document.createTextNode("⏹")
    stopBtn.appendChild(textForStopBtn)

    // Reset Button
    const resetBtn = document.createElement("button")
    Object.assign(resetBtn, {
        id: `${idIndex}-resetBtn`,
        className: "btn reset-button",
    })
    const textForResetBtn = document.createTextNode("⟲")
    resetBtn.appendChild(textForResetBtn);

    //Remove Button
    const removeBtn = document.createElement("button");
    Object.assign(removeBtn, {
        id: `${idIndex}-removeBtn`,
        className: "btn remove-button",
    });
    const textForRemoveBtn = document.createTextNode("X");
    removeBtn.appendChild(textForRemoveBtn);
    
    // Clear Interval if running
    // Add the elements to the div and then to the body
    newDiv.append(timerDisplay, inputField, startBtn, stopBtn, resetBtn, removeBtn)
    document.body.append(newDiv)
    
    startBtn.addEventListener("click", startTimer)
    stopBtn.addEventListener("click", stopTimer)
    resetBtn.addEventListener("click", resetTimer)
    removeBtn.addEventListener("click", removeDiv)
    
    idIndex++;                 
}

// TODO: use delete for removing elements; use empty slots to include new elements and change index number with the index of the empty slot, if no empty slots - add element to end of the array