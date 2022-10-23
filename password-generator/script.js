let sliderElement = document.querySelector("#slider");
let buttonElement = document.querySelector("#button");
let lengthPassword = document.querySelector("#valor");
let password = document.querySelector("#password");
let containerPassword = document.querySelector("#container-password");

let newPassword = "";

let chars = "0123456789abcdefghijklmnopqrstuvxywz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let onlyLetters = "abcdefghijklmnopqrstuvxywzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
let onlyNumbers = "0123456789";
/* let lettersSymbols = "abcdefghijklmnopqrstuvxywz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numbersSymbols = "0123456789!@#$%^&*()";
let lettersNumbers = "0123456789abcdefghijklmnopqrstuvxywzABCDEFGHIJKLMNOPQRSTUVWXYZ"; */

let arrayPasswords = [chars, onlyLetters, onlyNumbers];

lengthPassword.innerHTML = sliderElement.value;

slider.oninput = function () {
    lengthPassword.innerHTML = this.value;
}

function getPasswordType() {
    var radio_ele = document.querySelector('input[name="option"]:checked');
    console.log(radio_ele.value);
    return radio_ele.value;
}

function generatePassword() {
    let pass = "";
    for (let i = 0; i < sliderElement.value; i++) {
        pass += arrayPasswords[getPasswordType()].charAt(Math.floor(Math.random() * arrayPasswords[getPasswordType()].length));
    }
    containerPassword.classList.remove("hide");
    password.innerHTML = pass;
    newPassword = pass;
    console.log(arrayPasswords[getPasswordType()]);
}

function copyPassword() {
    alert("A sua senha foi copiada!");
    navigator.clipboard.writeText(newPassword);
}