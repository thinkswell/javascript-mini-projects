const minHand = document.querySelector(".min-hand");
const secHand = document.querySelector(".second-hand");
const hrHand = document.querySelector(".hour-hand");

const digitalBtn = document.querySelector(".digital");
const analogBtn = document.querySelector(".analog");
const stopwatchBtn = document.querySelector(".stopwatch");
const digitalClock = document.querySelector(".digital__clock");
const analogClock = document.querySelector(".clock");

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondDegrees = (seconds / 60) * 360 + 90;
  secHand.style.transform = `rotate(${secondDegrees}deg)`;

  const mins = now.getMinutes();

  const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;

  minHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = (hour / 12) * 360 + (mins / 60) * 30 + 90;

  hrHand.style.transform = `rotate(${hourDegrees}deg)`;
  digitalClock.textContent = `${hour}:${mins}:${seconds}`;
}

setInterval(setDate, 1000);
setDate();

digitalBtn.addEventListener("click", () => {
  digitalClock.style.display = "block";
  analogClock.style.display = "none";
});

analogBtn.addEventListener("click", () => {
  digitalClock.style.display = "none";
  analogClock.style.display = "block";
});
