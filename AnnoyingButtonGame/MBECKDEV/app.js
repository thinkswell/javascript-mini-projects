'use strict';

let gameState = {
  state: 'initial', // initial, playing, or finished
  timeLeft: '', // keeps track of timer to use when finished
};

let domThings = {
  buttonsArea: document.getElementById('buttons-area'),
  timeNumber: document.getElementById('countdown-timer'),
  buttonStartOrPlayAgain: document.getElementById('button-start-or-play-again'),
  highScoreSeconds: document.getElementById('high-score-seconds'),
  winLoseMessage: document.getElementById('win-lose-message'),
  countdownTimerContainer: document.getElementById('countdown-timer-container'),
  highscoreContainer: document.getElementById('highscore-container'),
};

let pastHighScore = 0;
let buttons = [];

function drawButtons() {
  let specialIndex = Math.floor(Math.random() * 16);

  for (let i = 0; i < 16; i++) {
    let oneSection = document.createElement('div');
    oneSection.classList.add('section');
    domThings.buttonsArea.appendChild(oneSection);

    let oneButton = document.createElement('button');
    oneButton.classList.add('initial');
    oneButton.classList.add('huehue');
    oneButton.textContent = 'Click Me!';
    oneSection.appendChild(oneButton);

    oneButton.addEventListener('click', (e) => {
      aButtonWasClicked(e, i);
    });

    buttons.push(oneButton);

    if (i === specialIndex) {
      oneButton.classList.add('special');
    }
  }
}

function aButtonWasClicked(e, buttonIndex) {
  if (gameState.state === 'playing') {
    let thisButton = e.target;

    if (thisButton.classList.contains('initial')) {
      thisButton.classList.remove('initial');
      thisButton.classList.add('moved-1');
    } else if (thisButton.classList.contains('moved-1')) {
      // if it's the special button, make it moved-2, else, delete it
      if (thisButton.classList.contains('special')) {
        thisButton.classList.remove('moved-1');
        thisButton.classList.add('moved-2');
      } else {
        thisButton.classList.remove('moved-1');
        thisButton.classList.add('hidden');
      }
    } else if (thisButton.classList.contains('moved-2')) {
      // this only happens on the special button
      thisButton.classList.remove('moved-2');
      thisButton.classList.add('moved-3');
    } else if (thisButton.classList.contains('moved-3')) {
      // this only happens on the special button
      thisButton.classList.remove('moved-3');
      thisButton.classList.add('moved-win');
      youWon(thisButton);
    }
  }
}

function youWon(thisButton) {
  clearInterval(intervalA);
  gameState.state = 'finished';
  thisButton.textContent = 'Stop clicking me! You win!';
  domThings.winLoseMessage.textContent = 'YOU WIN!';

  if (pastHighScore <= gameState.timeLeft) {
    pastHighScore = gameState.timeLeft;
    domThings.highScoreSeconds.textContent = pastHighScore;

    if (domThings.highscoreContainer.classList.contains('hidden')) {
      domThings.highscoreContainer.classList.remove('hidden');
    }
  }

  resetStartButton();
}

// tell the startbutton that if you click start, you start playing.
domThings.buttonStartOrPlayAgain.addEventListener('click', startPlaying);

let timerIncrement = 100; // in ms
const maxTime = 10000;

let intervalA = '';
let timerTime = 0;

function startPlaying() {
  // Show countdown timer first time hitting the start button
  if (domThings.countdownTimerContainer.classList.contains('hidden')) {
    domThings.countdownTimerContainer.classList.remove('hidden');
  }

  // Delete buttons if not first time playing
  let buttonsArea = document.getElementById('buttons-area');

  while (buttonsArea.firstChild) {
    buttonsArea.firstChild.remove();
  }

  // Hide win lose message and start button
  domThings.winLoseMessage.textContent = '';
  domThings.buttonStartOrPlayAgain.classList.add('hidden');

  // Set the state of the game and do other things
  gameState.state = 'playing';
  drawButtons();
  startTimer();
}

function startTimer() {
  timerTime = 0;
  intervalA = setInterval(countDown, timerIncrement);
}

function youLose() {
  gameState.state = 'finished';
  clearInterval(intervalA);
  domThings.winLoseMessage.textContent = 'YOU LOSE';
  resetStartButton();
}

function resetStartButton() {
  domThings.buttonStartOrPlayAgain.textContent = 'Play Again';
  domThings.buttonStartOrPlayAgain.classList.remove('hidden');
}

function countDown() {
  timerTime += timerIncrement;
  gameState.timeLeft = (maxTime - timerTime) / 1000;
  domThings.timeNumber.textContent = gameState.timeLeft;

  if (gameState.timeLeft <= 0) {
    youLose();
  }
}
