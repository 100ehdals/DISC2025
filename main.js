const inputField = document.querySelector("textarea");
const timer = document.querySelector(".timer");
const resultField = document.querySelector(".result");
let setTimer = 10;

let isCalculating = true;


/* Typearea */


/* Timer */ 


/* WPM calculation */


/* Keyboard Animation */
// keydown 동안 버튼 배경 바꾸기 anim
window.addEventListener('keydown', e => {
    const pressedKey = document.getElementById(e.key);
    if (pressedKey) pressedKey.classList.add("pressed");
});

// keyup하면 원래의 버튼 배경으로 유지
window.addEventListener('keyup', e => {
    const pressedKey = document.getElementById(e.key);
    if (pressedKey) pressedKey.classList.remove("pressed");
});


