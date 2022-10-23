const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
let userChoice;
let computerChoice;
let result;

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id;
    // console.log(userChoice);
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice();
    getResult();
}));


function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1;
    // console.log(randomNumber);
    if (randomNumber === 1) {
        computerChoice = 'rock';
    }
    if (randomNumber === 2) {
        computerChoice = 'paper';
    }
    if (randomNumber === 3) {
        computerChoice = 'scissors';
    }
    computerChoiceDisplay.innerHTML = computerChoice;
}

function getResult() {
    if (computerChoice === userChoice) {
        result = "It's a Draw!";
    }
    if (computerChoice === 'rock' && userChoice === 'paper') {
        result = 'User wins and Computer lose';
    }
    if (computerChoice === 'rock' && userChoice === 'scissors') {
        result = 'Computer Wins and User lose';
    }
    if (computerChoice === 'paper' && userChoice === 'rock') {
        result = 'Computer Wins and User lose';
    }
    if (computerChoice === 'paper' && userChoice === 'scissors') {
        result = 'User Wins and Computer lose';
    }
    if (computerChoice === 'scissors' && userChoice === 'paper') {
        result = 'Computer Wins and User lose';
    }
    if (computerChoice === 'scissors' && userChoice === 'rock') {
        result = 'User Wins and Computer lose';
    }
    resultDisplay.innerHTML = result;
}