const intervals = [];

function setCountdown(index) {
  const timerSet = document.getElementsByClassName('timer-set')[index];
  const dateInput = timerSet.getElementsByClassName('date-input')[0].value;
  const timeInput = timerSet.getElementsByClassName('time-input')[0].value;
  const targetDateTime = dateInput + 'T' + timeInput;

  if (!dateInput || !timeInput) {
    alert('Please enter both date and time.');
    return;
  }

  localStorage.setItem('countdown' + index, targetDateTime);
  initializeTimer(targetDateTime, index);
}

function initializeTimer(targetDateTime, index) {
  const targetDate = new Date(targetDateTime).getTime();

  if (intervals[index]) {
    clearInterval(intervals[index]);
  }

  intervals[index] = setInterval(function () {
    updateTimer(targetDate, index);
  }, 1000);
}

function updateTimer(targetDate, index) {
  const now = new Date().getTime();
  const distance = targetDate - now;
  const timerSet = document.getElementsByClassName('timer-set')[index];
  const display = timerSet.getElementsByClassName('timer-display')[0];

  if (distance < 0) {
    clearInterval(intervals[index]);
    display.innerHTML = "Countdown Finished";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  display.getElementsByClassName('days')[0].textContent = days;
  display.getElementsByClassName('hours')[0].textContent = hours;
  display.getElementsByClassName('minutes')[0].textContent = minutes;
  display.getElementsByClassName('seconds')[0].textContent = seconds;
}

function loadCountdowns() {
  const timers = document.getElementsByClassName('timer-set');
  Array.from(timers).forEach((timer, index) => {
    const savedTime = localStorage.getItem('countdown' + index);
    if (savedTime) {
      initializeTimer(savedTime, index);
      const [date, time] = savedTime.split('T');
      timer.getElementsByClassName('date-input')[0].value = date;
      timer.getElementsByClassName('time-input')[0].value = time;
    }
  });
}

window.onload = loadCountdowns;
