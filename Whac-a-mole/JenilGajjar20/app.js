const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#timeLeft");
const score = document.querySelector("#score");

let result = 0;
let timerId = null;
let hitPosition;
let timeCount = 15;

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add("mole");

  hitPosition = randomSquare.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 1000);
}

moveMole();

function countDown() {
  timeCount--;
  timeLeft.textContent = timeCount;
  if (timeCount == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert("Game over! Your final score is: " + result);
  }
}

let countDownTimerId = setInterval(countDown, 1000);
