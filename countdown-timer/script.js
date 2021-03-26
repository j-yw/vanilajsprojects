var daysEl = document.getElementById("days");
var hoursEl = document.getElementById("hours");
var minutesEl = document.getElementById("minutes");
var secondsEl = document.getElementById("seconds");

var newYears = "2021-01-01";

function countDown() {
  var newYearsDate = new Date(newYears);
  var currentDate = new Date();
  var totalTime = (newYearsDate - currentDate) / 1000;
  var days = Math.floor(totalTime / 3600 / 24);
  var hours = Math.floor(totalTime / 3600) % 24;
  var minutes = Math.floor(totalTime / 60) % 60;
  var seconds = Math.floor(totalTime) % 60;

  daysEl.innerHTML = days;
  hoursEl.innerHTML = hours;
  minutesEl.innerHTML = formatTime(minutes);
  secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// initial timer call
countDown();

setInterval(countDown, 1000);
