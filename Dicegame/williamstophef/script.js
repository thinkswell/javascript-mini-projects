'use strict';

//Selecting elements saved as a variable
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = () => {
  //starting positions

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling Dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    //Generate random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //Check for rolled 1: If
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // so switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', () => {
  if (playing) {
    //add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check score is >100
    if (scores[activePlayer] >= 50) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).innerHTML = 'Winner!!!';
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', () => {
  document.getElementById(`name--${activePlayer}`).innerHTML = `Player ${
    activePlayer + 1
  }`;
  init();
});
