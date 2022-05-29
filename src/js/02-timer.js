import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    // inputDat: document.getElementById('datetime-picker'),
    days: document.querySelector('.value[data-days]'),
    hours: document.querySelector('.value[data-hours]'),
    minutes: document.querySelector('.value[data-minutes]'),
    seconds: document.querySelector('.value[data-seconds]'),
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };

// refs.startBtn.disabled = true;

// flatpickr(inputDat, options);
// console.log(refs.days);

class Timer {
    constructor({onTick}) {
        this.isActive = false;
        this.onTick = onTick;
    }

    start() {
        if(this.isActive) {
            return;
        }

        const startTime = Date.now();
        this.isActive = true;

        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = currentTime - startTime;
            const time = this.getTimeComponents(deltaTime);

            this.onTick(time);
          }, 1000);
    }

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor(time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
        const minutes = this.pad(Math.floor(time % (1000 * 60 * 60) / (1000 * 60)));
        const seconds = this.pad(Math.floor(time % (1000 * 60) / (1000)));
    
        return { days, hours, minutes, seconds };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    };
};

const timer = new Timer({
    onTick: updateClokFace,
    targetDay: new Date('Jul 17, 2022'),
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function updateClokFace({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
};

let fp = flatpickr('#datetime-picker', options);