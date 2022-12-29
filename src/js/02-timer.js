import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let userData = null;
let timeInterval = null;

const refs = {
  dateTimeField: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};

const {
  dateTimeField: dateTimeInput,
  startBtn,
  daysField: daysInput,
  hoursField: hoursInput,
  minutesField: minutesInput,
  secondsField: secondsInput,
} = refs;

startBtn.disabled = 'true';
startBtn.addEventListener('click', onStartBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options['defaultDate']) {
      Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    }
    userData = selectedDates[0].getTime();
    startBtn.disabled = false;
  },
};

const addLeadingZero = value => String(value).padStart(2, 0);

function updateTimer() {
  const timerValue = userData - Date.now();
  const { days, hours, minutes, seconds } = convertMs(timerValue);

  daysInput.textContent = addLeadingZero(days);
  hoursInput.textContent = addLeadingZero(hours);
  minutesInput.textContent = addLeadingZero(minutes);
  secondsInput.textContent = addLeadingZero(seconds);

  if (timerValue < 1000) {
    clearInterval(timeInterval);
    return;
  }
}

function onStartBtn() {
  startBtn.disabled = true;

  updateTimer();

  timeInterval = setInterval(updateTimer, 1000);
}

flatpickr(dateTimeInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
timerStyle();

function timerStyle() {
  const input = document.querySelector('input');
  input.style.width = '500px';

  const timer = document.querySelector('.timer').style;
  timer.display = 'flex';
  timer.textTransform = 'uppercase';

  const fields = document.querySelectorAll('.field');
  fields.forEach(field => {
    field.style.display = 'flex';
    field.style.flexDirection = 'column';
    field.style.textAlign = 'center';
    field.style.width = '80px';
  });

  const values = document.querySelectorAll('.value');
  values.forEach(value => {
    value.style.fontSize = '50px';
  });
}

// console.log(convertMs(2000));
// console.log(convertMs(140000));
// console.log(convertMs(24140000));

//////////////////////////// ?
