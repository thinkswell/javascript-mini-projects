const display = document.getElementById("display");
const expressionDisplay = document.getElementById("expression");
const buttons = document.querySelectorAll("button");

let input = "";

function updateDisplay(result = "") {
    expressionDisplay.textContent = input || "0";
    display.textContent = result;
}

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const value = btn.id;

        if (value === "clear") {
            input = "";
            updateDisplay("");
        } else if (value === "backspace") {
            input = input.slice(0, -1);
            updateDisplay("");
        } else if (value === "equal") {
            try {
                // Invalid operator check
                if (/[\+\-\*\/]{2,}/.test(input)) {
                    updateDisplay("❌ Error: Invalid operator usage!");
                    input = "";
                    return;
                }

                // Invalid decimal
                const tokens = input.split(/[\+\-\*\/\(\)]/);
                for (let token of tokens) {
                    if ((token.match(/\./g) || []).length > 1) {
                        updateDisplay("❌ Error: Invalid decimal!");
                        input = "";
                        return;
                    }
                }

                // Division by zero
                if (/\/0+(?![0-9])/.test(input)) {
                    updateDisplay("❌ Error: Division by zero!");
                    input = "";
                    return;
                }

                const result = eval(input);
                input = result.toString();
                updateDisplay();
            } catch {
                updateDisplay("❌ Error");
                input = "";
            }
        } else {
            input += value;
            updateDisplay();
        }
    });
});
