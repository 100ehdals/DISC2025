const inputField = document.querySelector("textarea");
const timer = document.querySelector(".timer");
const resultField = document.querySelector(".result");
let setTimer = 10;

let isCalculating = true;

// 키를 누를때마다 어떤 키를 눌렀는지 로그에 출력해주는 코드
window.addEventListener('keydown', e => {
    console.log(e.key);

    if (e.key === 'Enter') {
        isCalculating = false;
        console.log('Calcualtion end?', isCalculating);
    }
})

function calcResult() {
    // wpm = (wordCount * 60) / timer
    const wordCount = inputField.value.length;
    const result = wordCount * 60 / 10;

    return result;
}

// 10초 타이머 --> 참고용
const dispTimer = setInterval(() => {
    timer.textContent = setTimer;

    if (setTimer === 0) {
        clearInterval(dispTimer);

        const result = calcResult();
        resultField.textContent = `${result} kpm`;

        return;
    }

    setTimer--;
}, 1000);
