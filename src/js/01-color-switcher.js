let intervalId = null;
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop'),
    body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

refs.stopBtn.disabled = true;

function onStartBtnClick() {
    // Дизаблим кнопку старт
    onDisabledStartBtn()
    // Если не запущен - запускаем интервал 
    onCreateIntercal();
};

function onStopBtnClick() {
    // Останавливаем интервал
    onClearInterval();
    // Делаем кнопку Старт активной
    onActiveStartBtn();
};

  function onCreateIntercal() {
      intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
  };
  function onClearInterval() {
      clearInterval(intervalId);
  };

  function onDisabledStartBtn() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
  };

  function onActiveStartBtn() {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
  };

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }