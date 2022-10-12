/**
 * Get all used elements
 */
const form = document.getElementById("number-guess-form");
const errorMessageEl = document.getElementById("error-message");
const totalCountEl = document.getElementById("total-count");
const totalWinsEl = document.getElementById("total-wins");
const resultTextEl = document.getElementById("result-text");

/**
 * Variables
 */
let randomNumber = getRandomInt();
let totalCount = 0;
let totalWins = 0;

console.log(randomNumber); // TODO: Remove

form.addEventListener("submit", function (e) {
  e.preventDefault();
  setErrorMessage("");

  const formData = new FormData(e.target);
  const userInput = parseInt(formData.get("number"));

  const errMessage = validateInput(userInput);

  if (!!errMessage) {
    setErrorMessage(errMessage);
    return;
  }

  totalCount++;
  totalCountEl.innerHTML = totalCount;

  if (userInput === randomNumber) {
    totalWins++;
    totalWinsEl.innerHTML = totalWins;

    resultTextEl.innerHTML = "Congrats, you guessed it!";

    randomNumber = getRandomInt();
  } else {
    const compare =
      userInput > randomNumber ? userInput - randomNumber : userInput;

    if (compare <= 25 * (randomNumber / 100)) {
      resultTextEl.innerHTML = "So far away.";
      return;
    }

    if (compare <= 60 * (randomNumber / 100)) {
      resultTextEl.innerHTML = "Not even close, make another guess.";
      return;
    }

    if (compare <= 75 * (randomNumber / 100)) {
      resultTextEl.innerHTML = "Getting closer, try again.";
      return;
    }

    if (compare <= 85 * (randomNumber / 100)) {
      resultTextEl.innerHTML = "Really close, try again.";
      return;
    }

    if (compare < 100 * (randomNumber / 100)) {
      resultTextEl.innerHTML = "So close you can taste it.";
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

function setErrorMessage(errMessage) {
  errorMessageEl.innerHTML = errMessage;
}

function getRandomInt() {
  return Math.floor(Math.random() * 100);
}
