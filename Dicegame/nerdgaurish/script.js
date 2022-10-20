'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');

let currentScore = 0
let activePlayer = 0;
let finalScore = [0,0];
let playing = true;

function resetScores(){
    playing = true;
     currentScore = 0
     activePlayer = 0;
     finalScore = [0,0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
////let currentScore1 = 0;
resetScores();

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', () => {
    if(playing){
    var diceNum = Math.trunc(Math.random()* 6) + 1
    diceEl.src = `dice-${diceNum}.png`;
    diceEl.classList.remove('hidden');
    if(diceNum !== 1){    
        currentScore += diceNum; 
        document.getElementById(`current--${activePlayer}`).textContent  = currentScore;   
    }else{
        switchPlayer();
    }
    }
});

btnHold.addEventListener('click', () =>{
    if(playing){
    finalScore[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = finalScore[activePlayer];
    if (finalScore[activePlayer] >= 100) {
                playing = false;
        diceEl.classList.add('hidden');
       
        document
          .querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    }else{
        
        switchPlayer();
    }}
});

btnNewGame.addEventListener('click',resetScores);


 

 

