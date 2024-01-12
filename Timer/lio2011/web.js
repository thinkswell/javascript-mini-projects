var count = new Date("Oct 24,2023 18:00:00").getTime();
var x = setInterval(function () {
  var now = new Date().getTime();
  var d = count - now;

  var days = Math.floor(d / (1000 * 60 * 60 * 24));
  var hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((d % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  if (d <= 0) {
    clearInterval(x);
  }
}, 1000);
