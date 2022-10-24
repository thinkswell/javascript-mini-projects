const countdown = () => {
  const countDate = new Date("Dec 19, 2021 00:00:00").getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  // Time as normal units
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Converting our gap to normal units not ms
  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  // Rendering countdown values into DOM
  document.querySelector(".day").innerText = textDay;
  document.querySelector(".hour").innerText = textHour;
  document.querySelector(".min").innerText = textMinute;
  document.querySelector(".sec").innerText = textSecond;
};

// calling the function for every second (1000ms = 1s)
setInterval(countdown, 1000);
