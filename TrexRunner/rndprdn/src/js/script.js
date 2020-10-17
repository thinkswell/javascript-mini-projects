const trex = document.querySelector(".trex");
const obstacle = document.querySelector(".obstacle");
const intro = document.querySelector(".intro");
let counter = 0;
let keyCode;

function jump() {
  trex.classList.add("animate");
  setTimeout(() => {
    trex.classList.remove("animate");
  }, 500);
}

document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    jump();
    obstacle.style.animation = "block 1s infinite linear";
    intro.style.display = "none";
    keyCode = e.keyCode;
  }
};

const checkDead = setInterval(function () {
  let trexPosition = parseInt(
    window.getComputedStyle(trex).getPropertyValue("bottom")
  );
  let obstacleLeft = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left")
  );

  if (obstacleLeft < 50 && obstacleLeft > -50 && trexPosition <= 50) {
    obstacle.style.animation = "none";
    alert("Game Over. score: " + Math.floor(counter / 100));
    intro.style.display = "block";
    counter = 0;
    keyCode = "";
  } else {
    document.querySelector(".score").innerHTML = Math.floor(counter / 100);
    if (keyCode == 32) {
      counter++;
    }
  }
}, 10);
