const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == "clear") {
      display.innerText = "";
    } else if (item.id == "backspace") {
      let string = display.innerText.toString();
      display.innerText = string.substr(0, string.length - 1);
    } else if (display.innerText != "" && item.id == "equal") {
      try {
        if (display.innerText.includes("/0")) {
          throw new Error("Division by zero");
        }
        display.innerText = Function(
          '"use strict";return (' + display.innerText + ")"
        )();
      } catch (e) {
        display.innerText = "Cannot divide by zero!";
        setTimeout(() => (display.innerText = ""), 2000);
      }
    } else if (display.innerText == "" && item.id == "equal") {
      display.innerText = "Empty!";
      setTimeout(() => (display.innerText = ""), 2000);
    } else {
      const lastChar = display.innerText.slice(-1);
      if (
        ["+", "-", "*", "/"].includes(lastChar) &&
        ["+", "-", "*", "/"].includes(item.innerText)
      ) {
        // Prevent adding multiple consecutive operators
        display.innerText = display.innerText.slice(0, -1) + item.innerText;
      } else {
        display.innerText += item.innerText;
      }
    }
  };
});

const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;
themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  isDark = !isDark;
};
