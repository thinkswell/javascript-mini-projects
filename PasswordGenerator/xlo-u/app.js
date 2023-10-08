//DOM Elements
const passwordElem = document.querySelector('.password');
const btnElem = document.getElementById('btn-generate');
const passwordLengthElem = document.getElementById('password-length-number');
const lowercaseElem = document.getElementById('lowercase');
const uppercaseElem = document.getElementById('uppercase');
const numbersElem = document.getElementById('numbers');
const symbolsElem = document.getElementById('symbols');

//when user clicks on btn, generate a new password
btnElem.addEventListener('click', updateUI);

//display generated password on UI
function updateUI(){
    const passwordLength = passwordLengthElem.value;
    const includeLowercase = lowercaseElem.checked;
    const includeUppercase = uppercaseElem.checked;
    const includeNumbers = numbersElem.checked;
    const includeSymbols = symbolsElem.checked;
    const password = generatePassword(passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
    passwordElem.innerText = password;
}

function generatePassword(len, isLC, isUC, isNum, isSym){
    let charCodes = [];
    if(isLC)
        charCodes = LOWERCASE_CHAR_CODES;
    if(isUC)
        charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if(isNum)
        charCodes = charCodes.concat(NUMBER_CHAR_CODES);
    if(isSym)
        charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
        
    const finalPassword = [];
    for(let i = 0; i < len; i++){
        const randomCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        finalPassword.push(String.fromCharCode(randomCode));
    }

    //if all of the checkbox are unchecked
    if(charCodes.length === 0) 
        return `Select at least one option`;
    
    return finalPassword.join(''); //return string of array finalPassword    
}

function arrayLowToHigh(low, high){
    let array = [];
    for(let i = low; i <= high; i++){
        array.push(i);
    }
    return array;
}

//Arrays storing all our characters
const LOWERCASE_CHAR_CODES = arrayLowToHigh(97, 122);
const UPPERCASE_CHAR_CODES = arrayLowToHigh(65, 90);
const NUMBER_CHAR_CODES = arrayLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayLowToHigh(33, 47)
                          .concat(arrayLowToHigh(58, 64))
                          .concat(arrayLowToHigh(91, 96))
                          .concat(arrayLowToHigh(123, 126));  