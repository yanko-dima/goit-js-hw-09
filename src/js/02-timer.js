const refs = {
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('.value[data-days]'),
    hours: document.querySelector('.value[data-hours]'),
    minutes: document.querySelector('.value[data-minutes]'),
    seconds: document.querySelector('.value[data-seconds]'),
};

refs.startBtn.addEventListener('click', () => {
    console.log('Start Timer');
});

// const timer = {

// };