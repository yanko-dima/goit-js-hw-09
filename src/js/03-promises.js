import { Notify } from 'notiflix';

let delay = null;
let step = null;
let count = null;

const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('.form button'),
};

refs.button.disabled = true;
refs.form.addEventListener('input', getInputData);
refs.form.addEventListener('submit', onCreatePromiseBtnClick);


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  })
};

function getInputData(e) {
  step = Number(e.currentTarget.step.value);
  delay = Number(e.currentTarget.delay.value);
  count = Number(e.currentTarget.amount.value);

  if(count && delay && step) {
    refs.button.disabled = false;
  }
};

function onCreatePromiseBtnClick(e) {
  e.preventDefault();

  if(count) {
    createPromise(1, delay).then(onSuccess).catch(onError);

    let createNewPromises = () => {
      for (let amount = 2; amount <= count; amount += 1) {
        delay += step;

        createPromise(amount, delay).then(onSuccess).catch(onError);
      }
    };

    createNewPromises();
    clearInputData();
  };
};

function clearInputData() {
  step = '';
  delay = '';
  count = '';
};

function onSuccess() {
  console.log('Succese');
};

function onError() {
  console.log('Error');
};