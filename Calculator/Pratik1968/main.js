let value = ""

let ans = 0


function setInput() {
    let input = document.getElementById("ans");
    input.value = value
}

window.onload = function() {
    setInput()
}

function NumberButtonClick(number) {
    let lastChar = value[value.length - 1];

    if (lastChar === '/' && number === 0) {
        alert("Error: Division by zero is undefined.");
        return null;
    } else {
        value += number
    }


    setInput()
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

    if (isOperator(lastChar) && Function !== '8') {
        return;
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
            ans = eval(value.replace("x", "*").replace("%", "*1/100").replace("^", "**"));
            value = ans;
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
            if (lastChar !== "." && !value.includes('.'))
                value += ".";
            break;
    }


    setInput()

}