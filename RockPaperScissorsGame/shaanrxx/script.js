// Declaring the possible choices for the game and initial scores for both players
const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;

// Adding event listeners to each game choice button
document.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", () => {
        playGame(button.id); // Triggers the playGame function on click
    });
});

// Reset game button event listener
document.getElementById("reset").addEventListener("click", resetGame);

// Function to handle the game logic
function playGame(playerChoice) {
    // Computer selects a random choice from the choices array
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    // Determine the winner of the round
    const resultMessage = determineWinner(playerChoice, computerChoice);

    // Update the DOM with the results and current scores
    document.getElementById("message").textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${resultMessage}`;
    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;
}

// Function to determine the winner of each round
function determineWinner(playerChoice, computerChoice) {
    // Check if it's a tie
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    }

    // Logic to determine if the player wins
    if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        playerScore++; // Increment player score
        return "You win!";
    } else {
        computerScore++; // Increment computer score
        return "Computer wins!";
    }
}

// Function to reset the game
function resetGame() {
    // Reset scores to zero
    playerScore = 0;
    computerScore = 0;
    // Clear messages and score display on the game interface
    document.getElementById("message").textContent = "";
    document.getElementById("player-score").textContent = "0";
    document.getElementById("computer-score").textContent = "0";
}

// Adding animation to cycle through words in the HTML
document.addEventListener('DOMContentLoaded', function() {
    // Select all span elements within h1
    const words = document.querySelectorAll('h1 span');
    let current = 0; // Track the current word index

    function animateWords() {
        // Remove the class from all words to reset the zoom effect
        words.forEach(word => {
            word.classList.remove('zoom-effect');
        });

        // Add the zoom effect class to the current word
        words[current].classList.add('zoom-effect');

        // Increment and wrap around the word index to start over when it reaches the end
        current = (current + 1) % words.length;
    }

    // Start the animation loop, changing the word every 3000 milliseconds (3 seconds)
    setInterval(animateWords, 3000);
});
