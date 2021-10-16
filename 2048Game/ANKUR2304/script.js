var q = 4;
var arr = document.getElementsByClassName("element");
init();

window.onload = init();

var arr = document.getElementsByClassName("element");

function right() {
  var can = false;
  var access = false;
  var k;
  var score = document.getElementById("score");

  for (var i = 14; i > 0; i -= 4) {
    //alert("step1");
    access = false;
    for (var j = i; j >= i - 2; j--) {
      //alert("step2");
      if (arr[j].innerHTML !== "") {
        k = j;
        while (
          k < i + 1 &&
          (parseInt(arr[k + 1].innerHTML) === parseInt(arr[k].innerHTML) ||
            arr[k + 1].innerHTML === "")
        ) {
          //alert("i="+i+" j="+j+" k="+k);
          if (
            parseInt(arr[k + 1].innerHTML) === parseInt(arr[k].innerHTML) &&
            access === false
          ) {
            arr[k + 1].innerHTML =
              parseInt(arr[k + 1].innerHTML) + parseInt(arr[k].innerHTML);
            score.innerHTML =
              parseInt(arr[k + 1].innerHTML) + parseInt(score.innerHTML);
            arr[k].innerHTML = "";
            can = true;
            access = true;
          } else if (
            parseInt(arr[k + 1].innerHTML) === parseInt(arr[k].innerHTML) &&
            access === true
          ) {
            access === false;
          } else if (arr[k + 1].innerHTML === "") {
            arr[k + 1].innerHTML = parseInt(arr[k].innerHTML);
            arr[k].innerHTML = "";
            can = true;
          }
          k += 1;
        }
      }
    }
  }
  if (can) {
    av();
  }
}

function left() {
  var can = false;
  var access = false;
  var k;
  var score = document.getElementById("score");
  //fixed
  for (var i = 13; i > 0; i -= 4) {
    //alert("step1");
    access = false;
    for (var j = i; j <= i + 2; j++) {
      //alert("step2");
      if (arr[j].innerHTML !== "") {
        k = j;
        while (
          k > i - (i % 4) &&
          (parseInt(arr[k - 1].innerHTML) === parseInt(arr[k].innerHTML) ||
            arr[k - 1].innerHTML === "")
        ) {
          //alert("i="+i+" j="+j+" k="+k);
          if (
            parseInt(arr[k - 1].innerHTML) === parseInt(arr[k].innerHTML) &&
            access === false
          ) {
            arr[k - 1].innerHTML =
              parseInt(arr[k - 1].innerHTML) + parseInt(arr[k].innerHTML);
            arr[k].innerHTML = "";
            can = true;
            access = true;
            score.innerHTML =
              parseInt(arr[k - 1].innerHTML) + parseInt(score.innerHTML);
          } else if (
            parseInt(arr[k - 1].innerHTML) === parseInt(arr[k].innerHTML) &&
            access === true
          ) {
            access === false;
          } else if (arr[k - 1].innerHTML === "") {
            arr[k - 1].innerHTML = parseInt(arr[k].innerHTML);
            arr[k].innerHTML = "";
            can = true;
          }
          k -= 1;
        }
      }
    }
  }
  if (can) {
    av();
  }
}

function down() {
  var can = false;
  var access = false;
  var k;
  var score = document.getElementById("score");
  //fixed
  for (var i = 11; i > 7; i -= 1) {
    //alert(arr[i].innerHTML==="");
    access = false;
    for (var j = i; j >= 0; j = j - 4) {
      if (arr[j].innerHTML !== "") {
        k = j;
        while (
          k < 12 &&
          (parseInt(arr[k + 4].innerHTML) === parseInt(arr[k].innerHTML) ||
            arr[k + 4].innerHTML === "")
        ) {
          //alert("i="+i+" j="+j+" k="+k);
          if (
            parseInt(arr[k + 4].innerHTML) === parseInt(arr[k].innerHTML) &&
            access === false
          ) {
            arr[k + 4].innerHTML =
              parseInt(arr[k + 4].innerHTML) + parseInt(arr[k].innerHTML);
            arr[k].innerHTML = "";
            can = true;
            access = true;
            score.innerHTML =
              parseInt(arr[k + 4].innerHTML) + parseInt(score.innerHTML);
          } else if (
            parseInt(arr[k + 4].innerHTML) === parseInt(arr[k].innerHTML) &&
            access === true
          ) {
            access === false;
          } else if (arr[k + 4].innerHTML === "") {
            arr[k + 4].innerHTML = parseInt(arr[k].innerHTML);
            arr[k].innerHTML = "";
            can = true;
          }
          k += 4;
        }
      }
    }
  }
  if (can) {
    av();
  }
}

function up() {
  var can = false;
  var access = false;
  var k;
  var score = document.getElementById("score");
  //fixed
  for (var i = 7; i > 3; i -= 1) {
    //alert(arr[i].innerHTML==="");
    access = false;
    for (var j = i; j < i + 9; j += 4) {
      if (arr[j].innerHTML !== "") {
        k = j;
        while (
          k >= i &&
          (parseInt(arr[k - 4].innerHTML) === parseInt(arr[k].innerHTML) ||
            arr[k - 4].innerHTML === "")
        ) {
          //alert("i="+i+" j="+j+" k="+k);
          if (
            parseInt(arr[k - 4].innerHTML) === parseInt(arr[k].innerHTML) &&
            access === false
          ) {
            arr[k - 4].innerHTML =
              parseInt(arr[k - 4].innerHTML) + parseInt(arr[k].innerHTML);
            arr[k].innerHTML = "";
            can = true;
            access = true;
            score.innerHTML =
              parseInt(arr[k - 4].innerHTML) + parseInt(score.innerHTML);
          } else if (
            parseInt(arr[k - 4].innerHTML) === parseInt(arr[k].innerHTML) &&
            access === true
          ) {
            access === false;
          } else if (arr[k - 4].innerHTML === "") {
            arr[k - 4].innerHTML = parseInt(arr[k].innerHTML);
            arr[k].innerHTML = "";
            can = true;
          }
          k -= 4;
        }
      }
    }
  }
  if (can) {
    av();
  }
}

function end() {
  alert(
    "Your Score Is:" + document.getElementById("score").innerHTML + " Game Over"
  );
  reset();
}

function random() {
  var done = false;
  while (done === false) {
    var num = Math.floor(Math.random() * 16);
    if (arr[num].innerHTML === "") {
      arr[num].innerHTML = 2;
      done = true;
    }
  }
}

function av() {
  var x = false;
  var count = 0;
  for (var i = 0; i < 16; i++) {
    if (arr[i].innerHTML === "") {
      x = true;
      count++;
    }
  }
  if (x) {
    random();
  }
  if (count === 1) {
    check();
  }
}

function check() {
  var x = false;
  for (var i = 0; i < 16; i++) {
    switch (i) {
      case 0:
        if (
          arr[1].innerHTML === arr[0].innerHTML ||
          arr[4].innerHTML === arr[0].innerHTML
        ) {
          x = true;
        }
        break;
      case 1:
        if (
          arr[1].innerHTML === arr[0].innerHTML ||
          arr[2].innerHTML === arr[1].innerHTML ||
          arr[1].innerHTML === arr[5].innerHTML
        ) {
          x = true;
        }
        break;
      case 2:
        if (
          arr[2].innerHTML === arr[1].innerHTML ||
          arr[3].innerHTML === arr[2].innerHTML ||
          arr[2].innerHTML === arr[6].innerHTML
        ) {
          x = true;
        }
        break;
      case 3:
        if (
          arr[3].innerHTML === arr[2].innerHTML ||
          arr[3].innerHTML === arr[7].innerHTML
        ) {
          x = true;
        }
        break;
      case 4:
        if (
          arr[4].innerHTML === arr[0].innerHTML ||
          arr[4].innerHTML === arr[8].innerHTML ||
          arr[4].innerHTML === arr[5].innerHTML
        ) {
          x = true;
        }
        break;
      case 5:
        if (
          arr[5].innerHTML === arr[1].innerHTML ||
          arr[5].innerHTML === arr[6].innerHTML ||
          arr[4].innerHTML === arr[5].innerHTML ||
          arr[5].innerHTML === arr[9].innerHTML
        ) {
          x = true;
        }
        break;
      case 6:
        if (
          arr[6].innerHTML === arr[5].innerHTML ||
          arr[6].innerHTML === arr[2].innerHTML ||
          arr[6].innerHTML === arr[7].innerHTML ||
          arr[6].innerHTML === arr[10].innerHTML
        ) {
          x = true;
        }
        break;
      case 7:
        if (
          arr[7].innerHTML === arr[3].innerHTML ||
          arr[7].innerHTML === arr[11].innerHTML ||
          arr[7].innerHTML === arr[6].innerHTML
        ) {
          x = true;
        }
        break;
      case 8:
        if (
          arr[8].innerHTML === arr[4].innerHTML ||
          arr[8].innerHTML === arr[12].innerHTML ||
          arr[8].innerHTML === arr[9].innerHTML
        ) {
          x = true;
        }
        break;
      case 9:
        if (
          arr[9].innerHTML === arr[8].innerHTML ||
          arr[9].innerHTML === arr[5].innerHTML ||
          arr[9].innerHTML === arr[10].innerHTML ||
          arr[9].innerHTML === arr[13].innerHTML
        ) {
          x = true;
        }
        break;
      case 10:
        if (
          arr[10].innerHTML === arr[9].innerHTML ||
          arr[10].innerHTML === arr[11].innerHTML ||
          arr[10].innerHTML === arr[6].innerHTML ||
          arr[10].innerHTML === arr[14].innerHTML
        ) {
          x = true;
        }
        break;
      case 11:
        if (
          arr[11].innerHTML === arr[7].innerHTML ||
          arr[11].innerHTML === arr[15].innerHTML ||
          arr[11].innerHTML === arr[10].innerHTML
        ) {
          x = true;
        }
        break;
      case 12:
        if (
          arr[12].innerHTML === arr[8].innerHTML ||
          arr[12].innerHTML === arr[13].innerHTML
        ) {
          x = true;
        }
        break;
      case 13:
        if (
          arr[13].innerHTML === arr[12].innerHTML ||
          arr[13].innerHTML === arr[9].innerHTML ||
          arr[13].innerHTML === arr[14].innerHTML
        ) {
          x = true;
        }
        break;
      case 14:
        if (
          arr[14].innerHTML === arr[13].innerHTML ||
          arr[14].innerHTML === arr[10].innerHTML ||
          arr[14].innerHTML === arr[15].innerHTML
        ) {
          x = true;
        }
        break;
      case 15:
        if (
          arr[15].innerHTML === arr[11].innerHTML ||
          arr[15].innerHTML === arr[14].innerHTML
        ) {
          x = true;
        }
        break;
    }
  }
  if (!x) {
    end();
  }
}

function init() {
  var s = document.getElementById("splash");
  s.style.display = "block";
  var arr = document.getElementsByClassName("element");
  for (var i = 0; i < 16; i += 1) {
    arr[i].innerHTML = "";
  }
  var control = document.getElementById("control");
  control.style.display = "block";
  var score = document.getElementById("score");
  score.innerHTML = 0;
}

function pause() {
  var pause = document.getElementById("pause");
  pause.style.display = "block";
  var control = document.getElementById("control");
  control.style.display = "none";
}
function reset() {
  var pause = document.getElementById("pause");
  pause.style.display = "none";
  init();
}
function start() {
  var splash = document.getElementById("splash");
  var game = document.getElementById("game");
  splash.style.display = "none";
  game.style.display = "block";
  random();
  random();
  //alert();
}
function resume() {
  var pause = document.getElementById("pause");
  pause.style.display = "none";
  var control = document.getElementById("control");
  control.style.display = "block";
}

window.addEventListener("keydown", function (e) {
  if (e.code == "ArrowLeft") {
    left();
  } else if (e.code == "ArrowRight") {
    right();
  } else if (e.code == "ArrowUp") {
    up();
  } else if (e.code == "ArrowDown") {
    down();
  }
});
