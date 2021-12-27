let numInput = document.querySelector('#numInput');
let stepInput = document.querySelector('#stepInput');
let charInput = document.querySelector('#charInput');
let clearButton = document.querySelector('#clearButton');

function cleanString(str, invalidRegex) {
    return str.replace(invalidRegex, '');
}

function removeSepChar(str, sepChar) {
    let specialChars = ['*', '.'];
    if (specialChars.includes(sepChar)) sepChar = '\\' + sepChar;
    let reg = new RegExp(sepChar, 'g');
    return str.toString().replace(reg, '');
}

function doSeparate(inputStr, stepLength = 4, sepChar = '-') {
    let str = removeSepChar(inputStr, sepChar);
    if (str.length <= stepLength || stepLength < 1) return str;
    let re = new RegExp(`.{1,${stepLength}}`, 'g');
    let matcher = str.match(re);
    let result = '';
    matcher.forEach((element, index, array) => {
        result += element;
        if (index !== array.length - 1)
            result += sepChar;
    });
    return result;
}

function getCharOption() {
    return charInput.options[charInput.selectedIndex].text;
}

function getStepOption() {
    return parseInt(stepInput.value);
}

function separate() {
    let value = numInput.value;
    let stepLength = getStepOption();
    let char = getCharOption();
    value = doSeparate(inputStr = cleanString(value, /[^\d]/g), stepLength, char);
    numInput.value = value;
}

numInput.addEventListener('input', () => {
    separate();
});

stepInput.addEventListener('input', () => {
    separate();
});

charInput.addEventListener('input', () => {
    separate();
});

clearButton.addEventListener('click', () => {
    numInput.value = '';
    stepInput.value = 4;
    charInput.value = 0;
});