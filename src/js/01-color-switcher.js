const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;
let buttons = document.querySelectorAll('button');

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

styleButtons();

function styleButtons() {
  buttons.forEach(btn => {
    btn.style.width = '100px';
    btn.style.height = '50px';
    btn.style.textTransform = 'uppercase';
  });
}

function onStart() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop() {
  clearInterval(timerId);
  stopBtn.disabled = true;
  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
