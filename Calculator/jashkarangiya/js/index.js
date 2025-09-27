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
        // Division by zero validation
        if (/\/(0+(?![0-9\.]))/.test(display.innerText)) {
          throw new Error("Division by zero");
        }
        // Consecutive operators validation
        if (/([+\-*/]{2,})/.test(display.innerText)) {
          throw new Error("Consecutive operators");
        }
        // Multiple decimal points in a number validation
        const tokens = display.innerText.split(/([+\-*/])/);
        for (let token of tokens) {
          if (token.split(".").length > 2) {
            throw new Error("Multiple decimals in a number");
          }
        }
        display.innerText = Function(
          '"use strict";return (' + display.innerText + ")"
        )();
      } catch (e) {
        let errorMsg = "Error!";
        if (e.message === "Division by zero") {
          errorMsg = "Cannot divide by zero!";
        } else if (e.message === "Consecutive operators") {
          errorMsg = "Invalid consecutive operators!";
        } else if (e.message === "Multiple decimals in a number") {
          errorMsg = "Invalid decimal usage!";
        }
        display.innerText = errorMsg;
        setTimeout(() => (display.innerText = ""), 2000);
      }
    } else if (display.innerText == "" && item.id == "equal") {
      display.innerText = "Empty!";
      setTimeout(() => (display.innerText = ""), 2000);
    } else {
      const lastChar = display.innerText.slice(-1);
      if (["+", "-", "*", "/"].includes(item.innerText)) {
        // Prevent consecutive operators
        if (
          display.innerText === "" ||
          ["+", "-", "*", "/"].includes(lastChar)
        ) {
          // Don't allow operator at start or after another operator
          return;
        }
        display.innerText += item.innerText;
      } else if (item.innerText === ".") {
        // Prevent multiple decimals in a number
        const parts = display.innerText.split(/([+\-*/])/);
        const lastNum = parts[parts.length - 1];
        if (lastNum.includes(".")) {
          return;
        }
        display.innerText += item.innerText;
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
