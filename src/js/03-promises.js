import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formInput = document.querySelector('.form');
const delayInput = document.querySelector('[name="delay"]');
const stepInput = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');

formInput.addEventListener('submit', onSubmitPromise);

function onSubmitPromise(e) {
  e.preventDefault();

  const firstDelay = Number(delayInput.value);
  const delayStep = Number(stepInput.value);
  const amount = Number(amountInput.value);
  let delay = firstDelay;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(onSucces)
      .catch(onError)
      .finally(() => {
        formInput.reset();
      });
    delay += delayStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSucces({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
