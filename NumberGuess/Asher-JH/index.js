/**
 * Get all used elements
 */
const form = document.getElementById("number-guess-form");
const errorMessageEl = document.getElementById("error-message");
const totalCountEl = document.getElementById("total-count");
const totalWinsEl = document.getElementById("total-wins");
const resultTextEl = document.getElementById("result-text");
const answerEl = document.getElementById("answer");
const numberInputEl = document.getElementById("number-input");
const guessBtn = document.querySelector(".btn");
const answerContainerEl = document.querySelector(".answer-container");

/**
 * Variables
 */
let randomNumber = getRandomInt();
let totalCount = 0;
let totalWins = 0;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  setDisplayText("");

  const formData = new FormData(e.target);
  const userInput = parseInt(formData.get("number"));

  numberInputEl.value = "";

  const errMessage = validateInput(userInput);

  if (!!errMessage) {
    setDisplayText(errMessage);
    setDisplayBgColor("red", "#fff");
    return;
  }

  totalCount++;
  totalCountEl.innerHTML = totalCount;

  if (userInput === randomNumber) {
    totalWins++;
    totalWinsEl.innerHTML = totalWins;

    setDisplayText("Congrats, you guessed it!");
    setDisplayBgColor("green", "#fff");
    answerContainerEl.style.borderColor = "green";
    answerContainerEl.style.backgroundColor = "rgb(20, 144, 20, 0.7)";
    answerEl.innerHTML = randomNumber;

    randomNumber = getRandomInt();
    guessBtn.setAttribute("disabled", true);

    setTimeout(() => {
      guessBtn.removeAttribute("disabled");
      answerContainerEl.style.borderColor = "rgb(234, 154, 6)";
      answerContainerEl.style.backgroundColor = "";
      answerEl.innerHTML = "?";
      setDisplayBgColor("aqua", "#000");
      setDisplayText("New game!");
    }, 2000);
  } else {
    const multiplier =
      userInput > randomNumber ? 100 - randomNumber : randomNumber;
    const compare =
      userInput > randomNumber
        ? multiplier - (userInput - randomNumber)
        : userInput;

    if (compare <= 25 * (multiplier / 100)) {
      setDisplayText("So far away.");
      setDisplayBgColor("orange", "#000");
      return;
    }

    if (compare <= 60 * (multiplier / 100)) {
      setDisplayText("Not even close, make another guess.");
      setDisplayBgColor("rgb(225, 180, 96)", "#000");
      return;
    }

    if (compare <= 75 * (multiplier / 100)) {
      setDisplayText("Getting closer, try again.");
      setDisplayBgColor("rgb(255, 247, 0)", "#000");
      return;
    }

    if (compare <= 85 * (multiplier / 100)) {
      setDisplayText("Really close, try again.");
      setDisplayBgColor("rgb(166, 255, 0, 0.6)", "#000");
      return;
    }

    if (compare < 100 * (multiplier / 100)) {
      setDisplayText("So close you can taste it.");
      setDisplayBgColor("#1eff00", "#000");
      return;
    }
  }
});

function validateInput(number) {
  if (isNaN(number) || number === undefined || number === null) {
    return "Please enter a number";
  }

  if (number > 100) {
    return "Please enter a number less than 100";
  }

  if (number <= 0) {
    return "Please enter a number more than 0";
  }

  return false;
}

function setDisplayText(text) {
  resultTextEl.innerHTML = text;
}

function setDisplayBgColor(color, textColor) {
  resultTextEl.style.backgroundColor = color;
  resultTextEl.style.color = textColor || "#000";
}

function getRandomInt() {
  return Math.floor(Math.random() * 100);
}
