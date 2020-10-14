function setTime() {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  //var h = 6; // uncomment to test day theme
  //var h = 18; // uncomment to test night theme
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";
  if ((h >= 12 && h < 18) || (h >= 6 && h < 12)) {
    setTheme("day");
  }

  if ((h >= 0 && h < 6) || h >= 18) {
    setTheme("night");
  }

  if (h === 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  /* check for 0 */
  h = h < 10 ? +("0" + h) : h;
  m = m < 10 ? +("0" + m) : m;
  s = s < 10 ? +("0" + s) : s;

  // var time = `${h}:${m}:${s} ${session}`;
  var time = h + ":" + m + ":" + s + " " + session; // <- browser compat
  document.getElementById("clock").innerText = time;

  /* progress of day calc  */

  var currentTime = [h * 3600, m * 60, s];
  var maxTime = [43200, 3600, 60];
  var reducer = function (accumulator, currentValue) {
    return accumulator + currentValue;
  };

  var curProgress = Math.floor(
    (currentTime.reduce(reducer) * 100) / maxTime.reduce(reducer)
  );
  updateProgressBar(curProgress, session, h);
}

function setTheme(string, h) {
  var sunIcon = document.getElementById("sun-icon");
  var moonIcon = document.getElementById("moon-icon");
  var digitalClock = document.querySelector(".digital-clock");
  var isNight = string === "night" ? true : false;
  var bgColor = isNight ? "#232323" : "ghostwhite";
  var fontColor = isNight ? "aliceblue" : "#404040";
  if (isNight) {
    moonIcon.style.color = fontColor;
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
  } else {
    sunIcon.style.color = fontColor;
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  }
  document.body.style.backgroundColor = bgColor;
  digitalClock.style.color = fontColor;
}

function updateProgressBar(curProgress, session, h) {
  var nextSession = session === "AM" ? "PM" : "AM";
  var porcentage = document.getElementById("porcentage");
  document.getElementById("progress-bar").style.width = curProgress + "%";
  porcentage.innerHTML = curProgress + "%";
  document.getElementById("current-session").innerHTML = session;
  document.getElementById("next-session").innerHTML = nextSession;
  if (h === 0) {
    porcentage.style.marginRight = "-18px";
  } else if (h === 12) {
    porcentage.style.right = 0;
  }
}

setInterval(setTime, 1000);

/* Digital clock FEATURES: */

/* automatic set night / day themes */

/* show progress of night / day */
