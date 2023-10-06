// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

document.getElementById("submit-guess").addEventListener("click", function() {
    const guess = parseInt(document.getElementById("guess-input").value);
    attempts++;

    if (isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById("result").textContent = "Please enter a valid number between 1 and 100.";
    } else if (guess === randomNumber) {
        document.getElementById("result").textContent = `Congratulations! You guessed the number ${randomNumber} in ${attempts} attempts.`;
        document.getElementById("submit-guess").disabled = true;
    } else if (guess < randomNumber) {
        document.getElementById("result").textContent = "Try a higher number.";
    } else {
        document.getElementById("result").textContent = "Try a lower number.";
    }
});
