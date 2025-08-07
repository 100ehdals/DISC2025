/* Get elements in HTML */
const keyboardBtn = document.querySelector("button");
const progressBar = document.querySelector(".progress-inner");
const inputField = document.querySelector(".overlay-input");
const dispState = document.querySelector(".result");
const resultBtn = document.querySelector(".redo");
const reqStr = document.querySelector(".req-str");
const inputStr = document.querySelector(".overlay-input");


/* Define variables */
var isTyping = false;  // Check if user started typing
const countingTime = 60;  // timeout in seconds

const text = "A person who thinks all the time has nothing to think except thoughts. \
            So, he loses touch with reality and live in the world of illusions. \
            By thoughts, I mean specifically, chatter in the skull, \
            perpetual and compulsive repetition of words, of reckoning and calculating.";
let startTime, endTime, countdown;
let wpm = 0, acc = 0;
let finalWpm = 0;


function calculateWpm() {
    const originalText = reqStr.innerText.trim();

    inputField.addEventListener('input', () => {
        const typedText = inputField.value.trim();
        const typedWords = typedText.split(' ');
        const typedChars = typedText.length;

        if (typedText === originalText) {
            testEnd();
            return;
        }

        const typedWordCount = typedWords.length;
        const elapsedTimeInSeconds = (Date.now() - startTime) / 1000;
        wpm = Math.round((typedWordCount / elapsedTimeInSeconds) * 60);

        dispState.innerHTML = wpm + "wpm" + '<br><br>' + calculateAcc(originalText, typedText) + "%" + '<br>';
    });

    startTime = Date.now();
}

function testEnd() {
    progressBar.style.width = "100%";
    progressBar.style.background = "gray";
    inputStr.disabled = true;
    resultBtn.style.display = 'block';
    isTyping = false;
    finalWpm = wpm;
    clearInterval(countdown);
    console.log(finalWpm, wpm);
}

function calculateAcc(original, input) {
    const minLength = Math.min(original.length, input.length);
    let accChars = 0;

    for (let i=0; i<=minLength; i++) {
        if (original[i] === input[i]) accChars++;
    }

    return Math.round((accChars / original.length) * 100);
}

function resetTest() {
    inputField.value = '';
    reqStr.innerHTML = "Press TAB to start";
    isTyping = false;
    inputStr.disabled = true;
    resultBtn.style.display ='none';   
    dispState.innerHTML = "";
    progressBar.style.background = "#00ff00";
    progressBar.style.width = "0%";
}

function activateTimer() {
    let interval = 10;  // update progress bar every 10 msec
    let totalTicks = countingTime * 1000 / interval;
    let tickCount = totalTicks;

    countdown = setInterval(() => {
        tickCount--;

        let progressWidth = tickCount / totalTicks * 100;  // Timer progress into %

        if (tickCount > 0) {
            progressBar.style.width = 100 - progressWidth + "%";
            setProgressBarColor(progressWidth);
        }
        else {
            clearInterval(countdown);
            testEnd();
        }
    }, interval);
}

const setProgressBarColor = (width) => {
    let deg = (width - 90) * 1.3;
    progressBar.style.filter = `hue-rotate(${deg}deg)`;
}


/* Keyboard Animation */
window.addEventListener('keydown', e => {
    const pressedKey = document.getElementById(e.key);

    if (!isTyping && e.key === 'Tab') {
        console.log("Start");
        reqStr.innerHTML = text;
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
});

resultBtn.addEventListener("click", () => {
    resetTest();
});

