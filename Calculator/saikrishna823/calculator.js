const inputBtn = document.getElementById("inputBtn");
const buttons = document.querySelectorAll(".button");
const evalButton = document.getElementById("evalButton");
const clearBtn = document.querySelector(".clearBtn");

const operators = ["+", "-", "*", "/"];

function showError(message) {
  inputBtn.value = message;
  inputBtn.classList.add("error");
}

function clearError() {
  inputBtn.classList.remove("error");
  if (inputBtn.value === "Invalid input" || inputBtn.value === "Cannot divide by zero") {
    inputBtn.value = "";
  }
}

function isValidExpression(expression) {
  if (!expression) {
    return false;
  }

  if (!/^[0-9+\-*/. ]+$/.test(expression)) {
    return false;
  }

  const firstCharacter = expression.charAt(0);
  const lastCharacter = expression.charAt(expression.length - 1);

  if (operators.includes(firstCharacter) || operators.includes(lastCharacter)) {
    return false;
  }

  return !/[+\-*/]{2,}/.test(expression);
}

buttons.forEach((button) => {
  button.onclick = () => {
    clearError();
    inputBtn.value += button.textContent;
  };
});

evalButton.onclick = () => {
  clearError();

  const expression = inputBtn.value.trim();
  if (!isValidExpression(expression)) {
    showError("Invalid input");
    return;
  }

  try {
    const result = Function(`"use strict"; return (${expression})`)();
    if (!Number.isFinite(result)) {
      showError("Cannot divide by zero");
      return;
    }

    inputBtn.value = result;
  } catch (error) {
    showError("Invalid input");
  }
};

clearBtn.onclick = () => {
  inputBtn.value = "";
  inputBtn.classList.remove("error");
};
