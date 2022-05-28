const refs = {
    startBtn: document.querySelector('.js-start'),
    stopBtn: document.querySelector('.js-stop'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

console.log('refs.startBtn');

// function getRandomHexColor() {
//     return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//   }

function onStartBtnClick() {
    console.log('Start');
};

function onStopBtnClick() {
    console.log('Stop');
};