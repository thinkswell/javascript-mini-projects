const minHand = document.querySelector(".min-hand");
const secHand = document.querySelector(".second-hand");
const hrHand = document.querySelector(".hour-hand");

const digitalBtn = document.querySelector(".digital");
const analogBtn = document.querySelector(".analog");
const stopwatchBtn = document.querySelector(".stopwatch");
const digitalClock = document.querySelector(".digital__clock");
const analogClock = document.querySelector(".clock");
const switchBtn = document.querySelector(".switch");

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
  digitalBtn.style.color = "#fff";
  analogBtn.style.color = "#d5d5d569";
  analogClock.style.display = "none";
});

analogBtn.addEventListener("click", () => {
  digitalClock.style.display = "none";
  analogBtn.style.color = "#fff";
  digitalBtn.style.color = "#d5d5d569";
  analogClock.style.display = "block";
});

switchBtn.addEventListener("click", () => {
  if (
    window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--main--color") == "#1F441E"
  ) {
    document.documentElement.style.setProperty("--main--color", "black");
    document.documentElement.style.setProperty("--primary-color", "#fff");
    document.documentElement.style.setProperty(
      "--secondary-color",
      "lightgrey"
    );
    switchBtn.textContent = "Night";
  } else {
    document.documentElement.style.setProperty("--main--color", "#1F441E");
    document.documentElement.style.setProperty("--primary-color", "#CEE6B4");
    document.documentElement.style.setProperty("--secondary-color", "#9ECCA4");
    switchBtn.textContent = "Day";
  }
});