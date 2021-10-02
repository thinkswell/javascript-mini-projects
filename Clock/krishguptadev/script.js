const sec = document.querySelector('.sec-hand');
const min = document.querySelector('.min-hand');
const hrs = document.querySelector('.hrs-hand');

function updateDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  sec.style.transform = `rotate(${secondsDegrees}deg)`;

  const minutes = now.getMinutes();
  const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
  min.style.transform = `rotate(${minuteDegrees}deg)`;

  const hours = now.getHours();
  const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
  hrs.style.transform = `rotate(${hoursDegrees}deg)`;

  document.documentElement.setAttribute('style', `--time: ${hours}:${minutes}:${seconds}`)
}

setInterval(updateDate, 1000);

updateDate();
