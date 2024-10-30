let num = Math.floor(Math.random() * 100)+1;
let chances = 0;
let message;
const guess=document.getElementById("result");
const errorMessage = document.getElementById("error-message");

function makeGuess() {
    var inputElement=document.getElementById("number");
    var inputValue=inputElement.value;
    
    if (inputValue.trim() === "") {
        errorMessage.textContent = "Please enter a number before guessing.";
        return; // Stop execution if no input is provided
    }
    errorMessage.textContent = "";
    
    chances++;
    if (inputValue == num) {
        message=`Congratulations! You guessed the number ${num} in ${chances} attempts.`;
    }
    else 
    {
        if (num > inputValue) {
          message=`Your guess is less than the number`;
        } else {
            message=`Your guess is greater than the number`;
        }
    }
    inputElement.value = "";
    guess.innerHTML=message;
}

function newtarget() {
    num = Math.floor(Math.random() * 100)+1;
    chances=0;
    result.innerHTML = ""; 
    errorMessage.textContent = "";
}