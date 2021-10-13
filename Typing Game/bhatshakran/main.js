let text_samples_arr = [
  "Push yourself, because no one else is going to do it for you.",
  "Failure is the condiment that gives success its flavor.",
  "Wake up with determination. Go to bed with satisfaction.",
  "It's going to be hard, but hard does not mean impossible.",
  "Learning never exhausts the mind.",
  "The only way to do great work is to love what you do.",
];

let time_text = document.querySelector(".time");
let wpm_text = document.querySelector(".wpm");
let act_text = document.querySelector(".text");
let inp_area = document.querySelector(".inp_box");

// inp_area.addEventListener("change", processCurrentText);

const TIME_LIMIT = 25;

let timeElapsed = 0;
let timeLeft = TIME_LIMIT;
let errors = 0;
let charactersTyped = 0;
let wordsTyped = 0;
let currentText = "";
let textNo = 0;
let userTypedInput;
let userTypedInputArr;
let actTextArr;
let totalErrors = 0;
let timer = null;
let wpm = 0;

function updateText() {
  act_text.textContent = null;
  currentText = text_samples_arr[textNo];

  currentText.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    act_text.appendChild(charSpan);
  });
  console.log(textNo);
  if (textNo < text_samples_arr.length - 1) textNo++;
  else textNo = 0;
}

function processCurrentText() {
  userTypedInput = inp_area.value;
  userTypedInputArr = userTypedInput.split("");

  charactersTyped++;

  actTextArr = act_text.querySelectorAll("span");

  actTextArr.forEach((char, idx) => {
    let typedChar = userTypedInputArr[idx];

    if (typedChar == null) {
      char.classList.remove("correct_char");
      char.classList.remove("incorrect_char");
    } else if (typedChar === char.innerText) {
      char.classList.add("correct_char");
      char.classList.remove("incorrect_char");
    } else {
      char.classList.remove("correct_char");
      char.classList.add("incorrect_char");

      errors++;
    }
  });

  if (userTypedInput.length == currentText.length) {
    updateText();
    totalErrors += errors;
    inp_area.value = "";
  }
}

function startTest() {
  resetValues();
  updateText();

  // clear old timer and start afresh
  clearInterval(timer);

  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  totalErrors = 0;
  accuracy = 0;
  charactersTyped = 0;
  quoteNo = 0;
  inp_area.disabled = false;

  inp_area.value = "";
  act_text.textContent = "Click on the area below to start the test.";
  time_text.textContent = timeLeft + "s";
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;

    timeElapsed++;
    time_text.textContent = timeLeft + "s";
  } else finishTest();
}

function finishTest() {
  // stop the timer
  clearInterval(timer);

  //disable the input area
  inp_area.disabled = true;

  // show final text

  act_text.textContent = "Click on restart to start a new test!";

  wpm = Math.round((charactersTyped / 5 / timeElapsed) * 60);

  wpm_text.textContent = "WPM: " + wpm;
  console.log(wpm);
}
