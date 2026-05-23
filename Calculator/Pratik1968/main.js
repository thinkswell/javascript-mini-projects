let value = "";

let ans = 0;


function setInput() {
    let input = document.getElementById("ans");
    input.value = value;
}

window.onload = function () {
    setInput();
}

// Validate input to prevent multiple decimal points
function hasDecimalInCurrentNumber() {
    // Get the last number in the expression (after last operator)
    const lastOperatorIndex = Math.max(
        value.lastIndexOf('+'),
        value.lastIndexOf('-'),
        value.lastIndexOf('x'),
        value.lastIndexOf('/'),
        value.lastIndexOf('^'),
        value.lastIndexOf('%')
    );
    const lastNumber = value.substring(lastOperatorIndex + 1);
    return lastNumber.includes('.');
}

// Validate input to prevent consecutive operators
function hasConsecutiveOperators() {
    if (value.length === 0) return false;
    const lastChar = value[value.length - 1];
    return ['+', '-', 'x', '/', '^', '%'].includes(lastChar);
}

// Check if expression ends with a number
function endsWithNumber() {
    if (value.length === 0) return false;
    const lastChar = value[value.length - 1];
    return !isNaN(parseFloat(lastChar)) && isFinite(lastChar);
}

function NumberButtonClick(number) {
    let lastChar = value[value.length - 1];

    // Prevent division by zero - if last char is '/' and user clicks 0, show error
    if (lastChar === '/' && number === 0) {
        alert("Error: Division by zero is undefined.");
        return null;
    }

    // Prevent multiple decimal points in current number
    if (number === '.' && hasDecimalInCurrentNumber()) {
        alert("Error: Multiple decimal points are not allowed.");
        return null;
    }

    // Prevent consecutive operators - if last char is operator and user clicks another operator (not decimal)
    if (hasConsecutiveOperators() && number !== '.') {
        // Replace the last operator with the new one
        value = value.slice(0, -1) + number;
        setInput();
        return null;
    }

    value += number;
    setInput();
}

function isOperator(value) {
    const operators = ['+', '-', '.', '^', '%', '/', 'x'];
    if (operators.includes(value)) {
        return true;
    }
    return false;
}

function functionButton(Function) {

    let input = document.getElementById("ans");
    if (input.value == "" || input.value == null) { return; }
    let lastChar = value[value.length - 1];

    // Prevent adding operator if expression already ends with an operator
    if (isOperator(lastChar) && Function !== '8') {
        // Allow decimal point even after operator
        if (Function === '11') { // decimal button check
            // handled separately
        } else {
            return;
        }
    }

    // Validate before evaluation
    if (Function === functionVar.equal) {
        // Check for trailing operators before evaluating
        if (isOperator(lastChar)) {
            alert("Error: Expression cannot end with an operator.");
            return;
        }
        // Check for division by zero in the expression
        if (value.includes('/0') && !value.includes('/0.')) {
            // More rigorous check: if we have /0 not followed by a decimal digit
            const divZeroPattern = /\/0(?![0-9])/;
            if (divZeroPattern.test(value)) {
                alert("Error: Division by zero is undefined.");
                return;
            }
        }
    }

    switch (Function) {
        case functionVar.add:
            if (lastChar !== "+")
                value += "+";
            break;
        case functionVar.substraction:
            if (lastChar !== "-")
                value += "-";
            break;
        case functionVar.multiplication:
            if (lastChar !== "x")
                value += "x";
            break;
        case functionVar.equal:
            try {
                ans = eval(value.replace("x", "*").replace("%", "*1/100").replace("^", "**"));
                value = ans;
            } catch (e) {
                alert("Error: Invalid expression.");
                value = "";
            }
            break;
        case functionVar.division:
            if (lastChar !== "/")
                value += "/";
            break;
        case functionVar.percentage:
            if (lastChar !== "%")
                value += "%";
            break;
        case functionVar.power:
            if (lastChar !== "^")
                value += "^";
            break;
        case functionVar.clear:
            value = "";
            break;
        case functionVar.backspace:
            value = value.slice(0, -1)
            break;
        case functionVar.decimal:
            // Check if current number already has a decimal
            if (hasDecimalInCurrentNumber()) {
                alert("Error: Multiple decimal points are not allowed.");
                return;
            }
            // If last char is operator, start new number with 0.
            if (isOperator(lastChar) || value.length === 0) {
                value += "0.";
            } else {
                value += ".";
            }
            break;
    }


    setInput()

}
