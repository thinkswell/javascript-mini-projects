const buttons = document.querySelectorAll('button');
const resultText = document.getElementById('result');

let userScore = 0;
let computerScore = 0;

// Function to generate a random choice for the computer
function computerPlay() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerImg = document.getElementById('computer-img');
    result = choices[randomIndex];
    if (result === 'Rock') {
        computerImg.src = "https://static.thenounproject.com/png/477914-200.png";
    } else if (result === 'Paper') {
        computerImg.src = "https://static.thenounproject.com/png/477912-200.png";
    } else if (result === 'Scissors') {
        computerImg.src = "https://static.thenounproject.com/png/477919-200.png";
    }
    
    return result;
}

// Function to play one round of the game
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "It's a tie!";
    } else if (
        (playerSelection === 'Rock' && computerSelection === 'Scissors') ||
        (playerSelection === 'Paper' && computerSelection === 'Rock') ||
        (playerSelection === 'Scissors' && computerSelection === 'Paper')
    ) {
        userScore += 10
        computerScore -= 5
        document.getElementById('user-score').textContent = userScore;
        document.getElementById('computer-score').textContent = computerScore;
        return `You win! ${playerSelection} beats ${computerSelection}.`;
    } else {
        userScore -= 5
        computerScore += 10
        document.getElementById('user-score').textContent = userScore;
        document.getElementById('computer-score').textContent = computerScore;
        return `You lose! ${computerSelection} beats ${playerSelection}.`;
    }
}

// Function to update the game results
function updateResults(result) {
    resultText.textContent = result;
}

// Add event listeners to the buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const playerSelection = button.id;
        const computerSelection = computerPlay();
        const roundResult = playRound(playerSelection, computerSelection);
        updateResults(roundResult);
    });
});
