/* Get elements in HTML */
const keyboardBtn = document.querySelector("button");
const progressBar = document.querySelector(".progress-inner");
const inputField = document.querySelector(".overlay-input");
const dispState = document.querySelector(".result");
const resultBtn = document.querySelector(".show-result");
const reqStr = document.querySelector(".req-str");
const inputStr = document.querySelector(".overlay-input");


/* Define variables */
var isTyping = false;  // Check if user started typing
const countingTime = 60;  // timeout in seconds

/* Typearea */


/* WPM calculation */
function calculateWpm() {
    let segmentInterval = 100;
    let segmentInputCount = 0;
    let arrayLen = countingTime * (1000 / segmentInterval);
    let segmentList = new Array(arrayLen + (1000 / segmentInterval)).fill(0);
    let segmentNo = 0;  // nth segment
    let currentCpm = 0;

    inputField.addEventListener("input", () => {
        segmentInputCount++;

        // count characters in the inputfield
        const typedText = inputField.value.trim();
        const inputLength = typedText.length;
    });

    // update cpm every 100 msec
    var cpsCalc = setInterval(() => {
        segmentList[segmentNo + (1000/segmentInterval) - 1] = segmentInputCount;

        // calculate cps
        for (let i=segmentNo; i<segmentNo+(1000/segmentInterval); i++) {
            currentCpm += segmentList[i];
        }

        console.log(segmentList);

        dispState.innerHTML = currentCpm * 12 + "wpm";
        segmentNo++;

        segmentInputCount = 0;
        currentCpm = 0;

        // if timeout then stop calculating
        if (isTyping == false) clearInterval(cpsCalc);
    }, segmentInterval);
}



/* Timer */ 
function activateTimer() {
    let interval = 10;  // update progress bar every 10 msec
    let totalTicks = countingTime * 1000 / interval;
    let tickCount = totalTicks;

    var countdown = setInterval(() => {
        tickCount--;

        let progressWidth = tickCount / totalTicks * 100;  // Timer progress into %

        if (tickCount > 0) {
            progressBar.style.width = 100 - progressWidth + "%";
            setProgressBarColor(progressWidth);
        }
        else {
            clearInterval(countdown);
            progressBar.style.width = "100%";
            progressBar.style.background = "gray";
            inputStr.disabled = true;
            resultBtn.style.display = 'block';
            isTyping = false;
        }
    }, interval);
}

const setProgressBarColor = (width) => {
    let deg = (width - 90) * 1.3;
    progressBar.style.filter = `hue-rotate(${deg}deg)`;
}


/* Result */


/* Keyboard Animation */
window.addEventListener('keydown', e => {
    const pressedKey = document.getElementById(e.key);

    if (!isTyping && e.key === 'Tab') {
        console.log("Start");
        reqStr.innerHTML =
            "A person who thinks all the time has nothing to think except thoughts. \
            So, he loses touch with reality and live in the world of illusions. \
            By thoughts, I mean specifically, chatter in the skull, \
            perpetual and compulsive repetition of words, of reckoning and calculating.";
        isTyping = true;
        inputStr.disabled = false;
        activateTimer();
        calculateWpm();
    }
    
    if (pressedKey) pressedKey.classList.add("pressed");
});

window.addEventListener('keyup', e => {
    const pressedKey = document.getElementById(e.key);
    if (pressedKey) pressedKey.classList.remove("pressed");
});


/* Result button animation */
resultBtn.addEventListener("mousedown", () => {
    resultBtn.classList.add("clicked")
});

resultBtn.addEventListener("mouseup", () => {
    resultBtn.classList.remove("clicked");
})
