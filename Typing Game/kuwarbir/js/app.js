window.addEventListener('load', init);

// Globals

// Available Levels
//const levels = {
//  easy: 5,
//  medium: 3,
//  hard: 1
//};

// To change level
let currentLevel ;

let time ;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');

const words = [
  'conjuring',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'annabelle',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'pishach',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'conducter',
  'master',
  'encyclopedia',
  'definition'
];

// Initialize Game
easy.addEventListener('click',setlev1);
medium.addEventListener('click',setlev2);
hard.addEventListener('click',setlev3);
let t;
function setlev1()
{
    time=8;
    t=time;
    seconds.innerHTML=10;
    message.innerHTML="";
    wordInput.value="";
    
}
function setlev2()
{
    time=6;
    t=time;
    seconds.innerHTML=7;
        message.innerHTML="";
        wordInput.value="";

    
}
function setlev3()
{
    time=4;
    t=time;
    seconds.innerHTML=5;
        message.innerHTML="";
        wordInput.value="";


}

function init() {
  // Show number of seconds in UI
    
  //seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = t;
    showWord(words);
    wordInput.value = '';
    score++;
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
      
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!';
    score = -1;
  }
}