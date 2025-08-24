let display = document.getElementById("display");

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function appendNumber(number) {
    if (number === '.' && display.value.includes('.') && !isNaN(display.value.slice(-1))) {
        alert("Error: Multiple decimal points are not allowed.");
        return;
    }
    display.value += number;
}

function addOperator(operator) {
    const lastChar = display.value.slice(-1);
    if (!display.value || isNaN(lastChar)) {
        alert("Error: Cannot add consecutive operators.");
        return;
    }
    display.value += operator;
}

function calculate() {
    try {
        if (display.value.includes("/0")) {
            alert("Error: Division by zero is undefined.");
            return;
        }
        display.value = eval(display.value);
    } catch (error) {
        alert("Error: Invalid operation.");
    }
}
