"use strict";

var input = document.getElementById("input"),
  number = document.querySelectorAll(".numbers div"),
  operator = document.querySelectorAll(".operators div"),
  result = document.getElementById("result"),
  clear = document.getElementById("clear"),
  resultDisplayed = false;

// =====================
// Helper Functions
// =====================
function isOperator(char) {
  return char === "+" || char === "-" || char === "×" || char === "÷";
}

function backspace() {
  if (resultDisplayed) {
    input.innerHTML = "";
    resultDisplayed = false;
  } else {
    input.innerHTML = input.innerHTML.slice(0, -1);
  }
}

function addValue(value) {
  var currentString = input.innerHTML;
  var lastChar = currentString[currentString.length - 1];

  // Prevent multiple decimals in one number
  if (value === ".") {
    var parts = currentString.split(/\+|\-|\×|\÷/);
    if (parts[parts.length - 1].includes(".")) return;
  }

  if (!resultDisplayed) {
    input.innerHTML += value;
  } else if (resultDisplayed && isOperator(lastChar)) {
    resultDisplayed = false;
    input.innerHTML += value;
  } else {
    resultDisplayed = false;
    input.innerHTML = value;
  }
}

// =====================
// Number Buttons
// =====================
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function (e) {
    addValue(e.target.innerHTML);
  });
}

// =====================
// Operator Buttons
// =====================
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function (e) {
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    if (currentString.length === 0) return;

    if (isOperator(lastChar)) {
      input.innerHTML =
        currentString.substring(0, currentString.length - 1) +
        e.target.innerHTML;
    } else {
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// =====================
// Equal Button
// =====================
result.addEventListener("click", calculate);

function calculate() {
  var inputString = input.innerHTML;
  if (inputString.length === 0) return;

  var numbers = inputString.split(/\+|\-|\×|\÷/g);
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  // Division
  var divide = operators.indexOf("÷");
  while (divide !== -1) {
    if (numbers[divide + 1] == 0) {
      input.innerHTML = "Error";
      resultDisplayed = true;
      return;
    }
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  // Multiplication
  var multiply = operators.indexOf("×");
  while (multiply !== -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  // Subtraction
  var subtract = operators.indexOf("-");
  while (subtract !== -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  // Addition
  var add = operators.indexOf("+");
  while (add !== -1) {
    numbers.splice(
      add,
      2,
      parseFloat(numbers[add]) + parseFloat(numbers[add + 1])
    );
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0];
  resultDisplayed = true;
}

// =====================
// Clear Button
// =====================
clear.addEventListener("click", function () {
  input.innerHTML = "";
  resultDisplayed = false;
});

// =====================
// Keyboard Support
// =====================
document.addEventListener("keydown", function (e) {
  if (e.key >= "0" && e.key <= "9") {
    addValue(e.key);
  }

  if (e.key === ".") {
    addValue(".");
  }

  if (e.key === "+" || e.key === "-") {
    addValue(e.key);
  }

  if (e.key === "*") {
    addValue("×");
  }

  if (e.key === "/") {
    addValue("÷");
  }

  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calculate();
  }

  if (e.key === "Backspace") {
    backspace();
  }

  if (e.key === "Escape") {
    input.innerHTML = "";
    resultDisplayed = false;
  }
});
