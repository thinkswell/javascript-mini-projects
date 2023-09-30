const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider()
// Set strength circle circle gray
setIndicator("#ccc")
// Set Password Length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min)*100 / (max - min) + "% 100%")
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    // Shadow
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}

function getRndInteger(min, max){
    return Math.floor(Math.random() * (max - min)) + min; 
}

function generateRndNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function  generateSymbol(){
    const rndNum = getRndInteger(0,symbols.length);
    return symbols.charAt(rndNum);

}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator("#0f0");
    }
    else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6){
        setIndicator("#ff0");
    } 
    else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }

    // To make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove('active');
    },2000);
}

function shufflePassword(array){
    // Fisher Yates Method
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    // Special Condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
});

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})
generateBtn.addEventListener('click', () => {
    // None of the Checkbox are Selected
    if(checkCount == 0)
        return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    // Remove Old Password
    password = "";

    // let's Put the stuff mentioned by Checkboxes
    
    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRndNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }

    let funcArr = [];
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRndNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }
    // Compulsory Addition
    for(let i = 0; i < funcArr.length; i++){
        password += funcArr[i]();
    }
    // Remaining Addition
    for(let i = 0; i < passwordLength - funcArr.length; i++){
        let rndIndex = getRndInteger(0,funcArr.length);
        password += funcArr[rndIndex]();
    }
    // Shuffle the Password
    password = shufflePassword(Array.from(password));
    // Show in UI
    passwordDisplay.value = password;
    // Calculate Strength
    calcStrength();
});