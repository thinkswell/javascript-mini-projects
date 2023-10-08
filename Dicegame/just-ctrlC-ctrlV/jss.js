`use strict`;

const diceFaces = document.getElementById("diceFaces");
const newGame = document.getElementById("newGame");
const rollDice = document.getElementById("rollDice");
const hold = document.getElementById("hold");

const player1 = {
  playerrStatusNo: "Player1",
  name: "Justin",
  mainScore: 0,
  currentScore: 0,
  status: "none",
};
const player2 = {
  playerrStatusNo: "Player2",
  name: "Angilina",
  mainScore: 0,
  currentScore: 0,
  status: "none",
};

let activePlayer = player1; // setting player one as default player

newGame.addEventListener("click", resetGame);
rollDice.addEventListener("click", rolingOfTheDice);
hold.addEventListener("click", holdingCurrentScore);

function rolingOfTheDice() {
  let diceFaceValue = Math.floor(Math.random() * 6 + 1);
  console.log(diceFaceValue);
  diceFaces.src = `${diceFaceValue}.png`;
  diceFaces.style.opacity = 1;

  calcCurrentScore(diceFaceValue);

  if (diceFaceValue == 1) {
    switchActivePlayer();
  }
}

//caculation of current score
function calcCurrentScore(diceFaceValue) {
  if (diceFaceValue != 1) {
    activePlayer.currentScore =
      activePlayer.currentScore + Number(diceFaceValue);

    document.getElementById(
      `currentScore${activePlayer.playerrStatusNo}`
    ).innerHTML = activePlayer.currentScore;
  }
}

//hold Score function
function holdingCurrentScore() {
  activePlayer.mainScore = activePlayer.mainScore + activePlayer.currentScore;
  document.getElementById(
    `mainScore${activePlayer.playerrStatusNo}`
  ).innerHTML = activePlayer.mainScore;
  if (activePlayer.mainScore >= 100) {
    activePlayer.status = "win";
    resetGame();
    return 0;
  }
  console.log(activePlayer);
  switchActivePlayer();
}
//switching Active player Function
function switchActivePlayer() {
  activePlayer.currentScore = 0; //setting current score=0;
  document.getElementById(`currentScorePlayer2`).innerHTML = "0";
  document.getElementById(`currentScorePlayer1`).innerHTML = "0";

  if (activePlayer == player1) {
    activePlayer = player2;
    // document.getElementById("left").style.opacity = "0.586";
    // document.getElementById("right").style.opacity = "0.205";

    // console.log(activePlayer);
    return 0;
  }

  if (activePlayer == player2) {
    activePlayer = player1;
    // document.getElementById("right").style.opacity = "0.586";
    // document.getElementById("left").style.opacity = "0.205";
    // console.log(activePlayer);
    return 1;
  }
}

//reset Game  Function
function resetGame() {
  player1.mainScore = 0;
  player1.currentScore = 0;
  player1.status = "none";
  player2.mainScore = 0;
  player2.currentScore = 0;
  player2.status = "none";
  activePlayer = player1;
  document.getElementById(`mainScorePlayer1`).innerHTML = 0;
  document.getElementById(`mainScorePlayer2`).innerHTML = 0;
}
