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
const symbols = '~`!@#$%^&*()_-+={[}]:;"<,>.?/';


let password = "";
let passwordLength = 10;
let checkCount = 0;

handleSlider();

setIndicator("#ccc");

// set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min)*100 / (max - min)) + "% 100%";
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber(min,max) {
    return getRndInteger(0,9);
}
 
function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97,123));
}
 
function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65,91));
}
 
function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}
 
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}
 
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(err) {
        copyMsg.innerText = "Failed";
    }
 
    //to make copy wala span visible
    copyMsg.classList.add("active");
 
    setTimeout(() => {
        copyMsg.classList.remove("active");
    },2000);
}
 
 
function shufflePassword(arr) {
    //Fisher Yates Method
    for(let i = arr.length - 1; i>0;i--) {
        const j = Math.floor(Math.random() * (i+1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
 
    let str = "";
    arr.forEach((el) => (str += el));
    return str;
}
 
function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });
 
    //special condition
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}
 
 
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})
 
 
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})
 
copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})
 
 
generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected
    if(checkCount <= 0)
        return;
 
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
 
    //generating password
     
    //remove old password
    password = "";
 
    let funcArr = [];
 
    if(uppercaseCheck.checked) {
        funcArr.push(generateUpperCase);
    }    
    if(lowercaseCheck.checked) {
        funcArr.push(generateLowerCase);
    }    
    if(numbersCheck.checked) {
        funcArr.push(generateRandomNumber);
    }    
    if(symbolsCheck.checked) {
        funcArr.push(generateSymbol);
    }    

    //compulsory addition
    for(let i=0;i<funcArr.length;i++) {
        password += funcArr[i]();
    }

    //remaining addition
    for(let i=0;i<passwordLength - funcArr.length;i++) {
        let randomIndex = getRndInteger(0,funcArr.length);
        password += funcArr[randomIndex]();
    }

    //shuffling the password
    password = shufflePassword(Array.from(password));

    //display the password in UI
    passwordDisplay.value = password;
    //calculate Strength
    calcStrength();

});
