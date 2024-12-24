let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let score = 0;
let highScore = Number.MIN_SAFE_INTEGER;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let h4 = document.querySelector("h4");

//keypress ==> Game Start
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game is Started");
    started = true;
  }

  levelUp();
});

function gameFlash(btn) {
  btn.classList.add("flash");

  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");

  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  h4.innerText = `Your Score : ${score}`;
  score++;

  let randomIdx = Math.floor(Math.random() * 3);
  let randomColor = btns[randomIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);
  //   console.log(randomIdx);
  //   console.log(randomColor);
  //   console.log(randomBtn);
  gameSeq.push(randomColor);
  console.log(gameSeq);
  gameFlash(randomBtn);
}

function checkAns(idx) {
  // console.log("curr level : ", level);

  if (userSeq[idx] === gameSeq[idx]) {
    if (gameSeq.length == userSeq.length) {
  
      if (score > highScore) {
        highScore = score;
        h3.innerHTML = `High Score: <u>${highScore}</u>`;
      }

      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${score}</b> <br>Press any key to start`;

    document.querySelector("body").style.backgroundColor = "red";

    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 120);
    reset();
  }
}

function btnpress() {
  let btn = this;
  console.log(btn);
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
  btn.addEventListener("click", btnpress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  score = 0;
}
