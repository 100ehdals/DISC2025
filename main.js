/* Get elements for keyboard buttons */
const keyboardBtn = document.querySelector("button");

/* Get elements for timer */
const progressBar = document.querySelector(".progress-inner");

/* Get elements for wpm display */
const dispState = document.querySelector(".result");

/* Get elements for the input/request field */
const reqStr = document.querySelector(".req-str");
const inputStr = document.querySelector(".overlay-input");


var isTyping = false;  // Check if user started typing

/* Typearea */


/* WPM calculation */


/* Timer */ 
function activateTimer() {
    console.log("Timer activating");
    const countingTime = 30;  // Counting time in seconds
    let interval = 10;  // update progress bar every 10 msec
    let totalTicks = countingTime * 1000 / interval;
    let tickCount = totalTicks;

    var countdown = setInterval(() => {
        tickCount--;

        let progressWidth = tickCount / totalTicks * 100;  // Timer progress into %

        if (tickCount > 0) {
            progressBar.style.width = 100 - progressWidth + "%";
            checkColors(progressWidth);
        }
        else {
            clearInterval(countdown);
            progressBar.style.width = "100%";
            progressBar.style.background = "gray";
            inputStr.disabled = true;
            console.log("Timer end / Press space to restart");
            dispState.innerHTML = "Press TAB to restart";
            isTyping = false;
        }
    }, interval);
}

const checkColors = (width) => {
    if (width > 50) progressBar.style.background = "green";
    else if (width > 30) progressBar.style.background = "yellow";
    else if (width > 10) progressBar.style.background = "orange";
    else progressBar.style.background = "red";
}


/* Keyboard Animation */
// keydown 동안 버튼 배경 바꾸기 anim
window.addEventListener('keydown', e => {
    const pressedKey = document.getElementById(e.key);
    console.log(e.key);

    if (!isTyping && e.key === 'Tab') {
        console.log("Start");
        reqStr.innerHTML = "They traveled night and day through a dangerous snowstorm. While temperatures dropped to negative 62 degrees, several dog died from exhaustion. But after five days of constant traveling, they finally arrived. And the town was saved by the dedication of the dogs.";
        isTyping = true;
        inputStr.disabled = false;
        activateTimer();
    }
    
    if (pressedKey) pressedKey.classList.add("pressed");
});

// keyup하면 원래의 버튼 배경으로 유지
window.addEventListener('keyup', e => {
    const pressedKey = document.getElementById(e.key);
    if (pressedKey) pressedKey.classList.remove("pressed");
});


