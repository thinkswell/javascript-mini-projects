const trex = document.querySelector(".trex");
const obstacle = document.querySelector(".obstacle");
let counter = 0;

function jump() {
  trex.classList.add("animate");
  setTimeout(() => {
    trex.classList.remove("animate");
  }, 500);
}

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
    counter = 0;
    obstacle.style.animation = "block 1s infinite linear";
  } else {
    counter++;
    document.querySelector(".score").innerHTML = Math.floor(counter / 100);
  }
}, 10);
