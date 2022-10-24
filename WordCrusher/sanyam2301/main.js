window.addEventListener("load", init);

//available levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2,
};

//to change lvele
const currentLevel = levels.easy;
//global var
let time = currentLevel;

let score = 0;
let isPlaying;

//dom elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const highscoreDisplay = document.querySelector("#highscore");

const words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "horrendous",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space",
  "definition",
  "harms",
  "banba",
  "begad",
  "criss",
  "sacry",
  "puist",
  "poppa",
  "shivy",
  "tares",
  "usual",
  "older",
  "plate",
  "stauk",
  "kisan",
  "apsis",
  "brins",
  "ellan",
  "copia",
  "awner",
  "nexal",
  "bergs",
  "sintu",
  "ahura",
  "golpe",
  "dungy",
  "sloka",
  "audio",
  "unsay",
  "nauch",
  "abdat",
  ,
  "lewdest",
  "describes",
  "hellos",
  "pycnite",
  "relucts",
  "ariels",
  "outfox",
  "morfond",
  "elling",
  "downgoing",
  "aligns",
  "runtime",
  "reapplies",
  "coree",
  "seedcakes",
  "engin",
  "bastions",
  "swellest",
  "lymphad",
  "bagel",
  "hottle",
  "unfledged",
  "infarcts",
  "leadout",
  "saumya",
  "cooker",
  "kristian",
  "protease",
  "reusing",
];

//init game
function init() {
  // console.log('start')
  //show number of seconds in Ui
  seconds.innerHTML = currentLevel;
  //load word from array
  showWord(words);
  //startmatching the input
  wordInput.addEventListener("input", startMatch);

  //call countdown everysecond
  setInterval(countdown, 1000);
  //check game status
  setInterval(checkStatus, 50);
}

//pick asnd show random word
function showWord(words) {
  //generate array random index
  const randIndex = Math.floor(Math.random() * words.length);
  //output random words
  currentWord.innerHTML = words[randIndex];
}

function countdown() {
  //check time is not up
  if (time > 0) {
    //decrement the time
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  //show time

  timeDisplay.innerHTML = time;
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Game Over!!!";
    message.style = "color:red";
    score = -1;
  }
}

function startMatch() {
  if (matchWords()) {
    // console.log('Match!!');
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score++;
  }
  console.log(words.length);
  // Highscore based on score value for Session Storage
  if (
    typeof sessionStorage["highscore"] === "undefined" ||
    score > sessionStorage["highscore"]
  ) {
    sessionStorage["highscore"] = score;
  } else {
    sessionStorage["highscore"] = sessionStorage["highscore"];
  }

  // Prevent display of High Score: -1
  if (sessionStorage["highscore"] >= 0) {
    highscoreDisplay.innerHTML = sessionStorage["highscore"];
  }
  if (score === -1) {
    score = 0;
  }
  scoreDisplay.innerHTML = score;
}

function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct!!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}
