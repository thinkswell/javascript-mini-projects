const secHand = document.querySelector(".sec");
const minHand = document.querySelector(".min");
const hrsHand = document.querySelector(".hrs");

function setTime() {
  const now = new Date();

  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hrs = now.getHours();

  console.log(`${hrs}   ${min}   ${sec}`);

  const secDegree = (sec / 60) * 360;
  const minDegree = (min / 60) * 360;
  const hrsDegree = (hrs / 12) * 360;

  secHand.style.transform = `rotate(${secDegree + 90}deg)`;
  minHand.style.transform = `rotate(${minDegree}deg)`;
  hrsHand.style.transform = `rotate(${hrsDegree}deg)`;
}
setInterval(setTime, 1000);