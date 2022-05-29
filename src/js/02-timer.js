import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('.value[data-days]'),
    hours: document.querySelector('.value[data-hours]'),
    minutes: document.querySelector('.value[data-minutes]'),
    seconds: document.querySelector('.value[data-seconds]'),
};
let intervalId = null;

refs.startBtn.disabled = true;

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
};
  
const onClose = (selectedDates, dateStr, instance) => {
    const calcTime = selectedDates[0] - instance.now;

    if(calcTime && calcTime > 0) {
        refs.startBtn.disabled = false;

        const startTimer = () => {
            refs.startBtn.disabled = true;
        
            // const startTime = Date.now();
        
            intervalId = setInterval(() => {
                const currentTime = Date.now();
                
                const deltaTime = selectedDates[0] - currentTime;
                let timerUpdate = convertMs(deltaTime);
        
                // Запись обновления
                refs.days.innerHTML = timerUpdate.days;
                refs.hours.innerHTML = timerUpdate.hours;
                refs.minutes.innerHTML = timerUpdate.minutes;
                refs.seconds.innerHTML = timerUpdate.seconds;
              }, 1000);
         };
        
         refs.startBtn.addEventListener('click', startTimer);

    } else {
        Notify.failure('Please choose a date in the future');
    };

 }; 

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose,
  };

let fp = flatpickr('#datetime-picker', options);