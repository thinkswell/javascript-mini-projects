// Timer variables
let timer;
let secondsLeft = 300; // 5 minutes (5 * 60 seconds)

// Score variables
let score = 0;
const scoreDecrement = 0.01; // Amount to decrement the score each second

// Function to update the score display in the HTML
function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = `Score: ${score.toFixed(2)}`; // Display score with two decimal places
}

// Function to update the timer display
function updateTimerDisplay() {
    const timerDisplay = document.getElementById("timer");
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Function to handle the timer countdown
function countdown() {
    timer = setInterval(() => {
        secondsLeft--;
        // Decrement the score by 0.01 for each second that elapses
        score -= scoreDecrement;
        updateScoreDisplay();
        updateTimerDisplay();
        if (secondsLeft === 0) {
            // Timer has run out, display a message and reset the game
            alert("Time's up! Your final score is: " + score.toFixed(2));
            location.reload();
        }
    }, 1000); // Update every 1 second
}

// Start the timer
countdown();

// Score variables
let correctGuesses = 0; // Initialize correctGuesses in the global scope
let totalGuesses = 0; // Initialize totalGuesses in the global scope
let selectedPhrase; // Declare selectedPhrase in the global scope

// Function to calculate the score
function calculateScore() {
    return correctGuesses / totalGuesses * 100;
}

// Function to draw the gallows
function drawGallows() {
    // Define canvas and context
    const canvas = document.getElementById('hangman');
    const context = canvas.getContext('2d');

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Define gallows
    context.strokeStyle = '#505050';
    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(175, 225);
    context.lineTo(5, 225);
    context.moveTo(40, 225);
    context.lineTo(25, 5);
    context.lineTo(100, 5);
    context.lineTo(100, 25);
    context.stroke();
}

// Rest of your code...


// Function to draw hangman parts based on incorrect guesses
function drawHangman(incorrectGuesses) {
    // Define canvas and context
    const canvas = document.getElementById('hangman');
    const context = canvas.getContext('2d');

    // Define hangman parts
    const hangmanParts = [
        // Head
        () => {
            context.lineWidth = 5;
            context.beginPath();
            context.arc(100, 75, 25, 0, Math.PI * 2, true);
            context.closePath();
            context.stroke();
        },
        // Body
        () => {
            context.beginPath();
            context.moveTo(100, 100);
            context.lineTo(100, 170);
            context.stroke();
        },
        // Right Arm
        () => {
            context.beginPath();
            context.moveTo(100, 110);
            context.lineTo(60, 140);
            context.stroke();
        },
        // Left Arm
        () => {
            context.beginPath();
            context.moveTo(100, 110);
            context.lineTo(140, 140);
            context.stroke();
        },
        // Right Leg
        () => {
            context.beginPath();
            context.moveTo(100, 170);
            context.lineTo(80, 210);
            context.stroke();
        },
        // Left Leg
        () => {
            context.beginPath();
            context.moveTo(100, 170);
            context.lineTo(120, 210);
            context.stroke();
        }
    ];

    // Draw the hangman parts based on the number of incorrect guesses
    for (let i = 0; i < incorrectGuesses && i < hangmanParts.length; i++) {
        hangmanParts[i]();
    }
}

// Function to fetch and parse phrases from a text file
async function fetchPhrasesFromFile(filePath) {
    try {
        const response = await fetch(filePath);
        const text = await response.text();
        // Split the text into an array of phrases using newline characters
        const phrases = text.trim().split('\n');
        // Convert all phrases to lowercase
        const lowercasePhrases = phrases.map(phrase => phrase.toLowerCase());
        // Filter out phrases with punctuation
        const filteredPhrases = lowercasePhrases.filter(phrase => /^[a-z\s]+$/.test(phrase));
        return filteredPhrases;
    } catch (error) {
        console.error("Error fetching phrases:", error);
        return [];
    }
}

// Function to enable letter buttons
function enableLetterButtons() {
    const letterButtons = document.querySelectorAll("#letter-buttons button");
    letterButtons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = ''; // Reset button background color
        button.dataset.clicked = "false"; // Reset the data attribute
    });
}

// Use the fetchPhrasesFromFile function to load phrases from the file (phrases.txt)
fetchPhrasesFromFile('phrases.txt')
    .then(phrases => {
        // Select a random phrase from the loaded phrases
        selectedPhrase = getRandomValidPhrase(phrases);

        // Initialize the guessed phrase as an array with underscores for all characters
        let guessedPhrase = selectedPhrase.split('').map(char => (char === ' ' ? ' ' : '_'));

        // Initialize the incorrect guesses counter
        let incorrectGuesses = 0;

        // Function to update the phrase display
        function updatePhraseDisplay() {
            const phraseDisplay = document.getElementById("phrase-display");
            // Replace consecutive spaces with a single space
            const formattedPhrase = guessedPhrase.join('').replace(/\s+/g, ' ');
            phraseDisplay.textContent = formattedPhrase.toUpperCase(); // Convert to uppercase
        }

        // Function to create letter buttons
        function createLetterButtons() {
            const letterButtonsContainer = document.getElementById("letter-buttons");
            for (let letter = 'A'.charCodeAt(0); letter <= 'Z'.charCodeAt(0); letter++) {
                const button = document.createElement("button");
                button.textContent = String.fromCharCode(letter);
                button.dataset.clicked = "false"; // Add a data attribute to track button clicks
                button.addEventListener("click", () => {
                    if (button.dataset.clicked === "false") {
                        const guessedLetter = String.fromCharCode(letter).toLowerCase(); // Convert to lowercase
                        handleGuess(guessedLetter, button); // Pass the button as an argument
                        button.disabled = true;
                        button.dataset.clicked = "true"; // Set the data attribute to "true" after clicking
                        if (selectedPhrase.includes(guessedLetter)) {
                            button.style.backgroundColor = 'green'; // Correct guess
                        } else {
                            button.style.backgroundColor = 'red'; // Incorrect guess
                        }
                    }
                });
                letterButtonsContainer.appendChild(button);
            }
        }

        // Function to handle a letter guess
        // Function to handle a letter guess
        function handleGuess(letter, button) {
            totalGuesses++; // Increment the total number of guesses

            let letterFound = false;
            for (let i = 0; i < selectedPhrase.length; i++) {
                if (selectedPhrase[i] === letter) {
                    guessedPhrase[i] = letter;
                    letterFound = true;
                }
            }

            if (!letterFound) {
                // Letter is incorrect
                incorrectGuesses++;
                // Display ASCII hangman here (add ASCII art for hangman)
                const hangmanAscii = document.getElementById("hangman-ascii");
                // You can add ASCII art representing hangman at different stages based on incorrectGuesses
                hangmanAscii.textContent = "Incorrect Guesses: " + incorrectGuesses;

                if (incorrectGuesses === 6) {
                    // On the 6th incorrect guess, show an alert
                    alert("You've reached 6 incorrect guesses. The game will now reset.");
                    // Reload the page to start over
                    location.reload();
                }
            } else {
                // Letter is correct
                correctGuesses++; // Increment the number of correct guesses
                // Update the score for correct guesses
                score += 1; // You can adjust this value based on how much score you want to add for each correct guess
            }

            // Set the data attribute to "true" to mark the button as clicked
            button.dataset.clicked = "true";

            // Draw the hangman parts here based on incorrectGuesses
            drawHangman(incorrectGuesses);

            // Update the phrase display
            updatePhraseDisplay();

            // Update the score display
            updateScoreDisplay(); // Update the score display when a guess is made

            // Check if the phrase is completed
            if (isPhraseCompleted()) {
                // Calculate the score as the ratio of correct guesses to total guesses
                const finalScore = calculateScore();
                // Reset the game state
                resetGame();
            }
        }


        // Function to reset the game state
        function resetGame() {
            const letterButtons = document.getElementById("letter-buttons");
            letterButtons.innerHTML = "";
            // Enable all letter buttons
            createLetterButtons();

            // Generate a new phrase
            selectedPhrase = getRandomValidPhrase(phrases);
            guessedPhrase = selectedPhrase.split('').map(char => (char === ' ' ? ' ' : '_'));
            incorrectGuesses = 0;
            // Clear the hangman canvas
            drawGallows();
            // Update the phrase display
            updatePhraseDisplay();
        }

        // Function to get a random valid phrase from the list
        function getRandomValidPhrase(phrases) {
            let randomPhrase = "";
            do {
                randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            } while (!/^[a-z\s]+$/.test(randomPhrase));
            return randomPhrase;
        }

        // Function to check if the current phrase is completed
        function isPhraseCompleted() {
            return guessedPhrase.join('') === selectedPhrase;
        }

        // Initialize the game
        updatePhraseDisplay();
        createLetterButtons();

        // Initialize the gallows
        drawGallows();
    });
