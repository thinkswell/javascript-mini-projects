

// ============= All variables ========================
const passwordContainer = document.querySelector(".password h2");
const generateBtn = document.querySelector(".generate-btn")
const copyBtn = document.querySelector(".copy-btn")
const checkNumber = document.getElementById("number")
const checkSymbol = document.getElementById("symbol")
const checkUpper = document.getElementById("uppercase")
const checkLower = document.getElementById("lowercase")

const lengthValue = document.getElementById("rangevalue")
const lengthBtn = document.getElementById("length")

const coiped = document.querySelector(".copy-text-alert")


// =========== get length value for password =================
let length = 12
lengthBtn.addEventListener("input", () => {
    lengthValue.innerText = lengthBtn.value;
    length = lengthValue.innerText
})

//  function for create new password ///////////////////////////
checkLower.checked = true; // generate lowercase passward by default..

const createNewPassword = (len) => {
    let res = ''
    let chars = '';
    // below conditions for catomization password type ....
    if (checkNumber.checked) {
        chars += '0123456729850589'
    }
    if (checkSymbol.checked) {
        chars += '!@#$%^&*?/.,=+-_'
    }
    if (checkUpper.checked) {
        chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    if (checkLower.checked) {
        chars += 'abcdefghijklmnopqrstuvwxyz'
    }

    let c = 0;
    while (c < len) {
        res += chars.charAt(Math.floor(Math.random() * chars.length))
        c++;
    }

    return res;
}


generateBtn.addEventListener("click", () => {
    passwordContainer.textContent = createNewPassword(length)
})

// ................. for copy password . . . .......................

copyBtn.addEventListener("click", () => {
    const txt = passwordContainer.textContent;
    // console.log(txt);
    navigator.clipboard.writeText(txt);

    coiped.style.display = "block"
    setTimeout(function () {
        coiped.style.display = "none"
    }, 1000);

})

