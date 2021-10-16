let correctNumber;
let attemptsLeft;
const cardDeck = document.getElementById("card-deck");
const hints = document.getElementById("hints");
const remainingAttempts = document.getElementById("attempts-left");

const min = 1;
const max = 20;
let gameWon;

/**
 * Start game - initialize parameter values
 */
 const startGame = () => {
    cardDeck.innerHTML = '';
    hints.innerHTML = '';
    attemptsLeft = 5;
    gameWon = false;

    remainingAttempts.innerHTML = attemptsLeft;
    generateDeck();
    generateRandomNumber();
};

/**
 * Generate 20 cards on card deck
 */
const generateDeck = () => {
    document.body.style.backgroundColor = '#D8DBA8';

    for (let cardId=min; cardId<=max; cardId++) {
        let cardTitle = document.createElement('h2');
        cardTitle.className = "card-title";
        cardTitle.textContent = cardId;

        let cardBody = document.createElement('div');
        cardBody.className = "card-body";
        cardBody.appendChild(cardTitle);
        
        let card = document.createElement('div');
        card.className = "card";
        card.id = cardId;
        card.onclick = () => clickCard(cardId);
        card.appendChild(cardBody);

        cardDeck.appendChild(card);        
    }

};

/**
 * Disable 20 cards on card deck (make all cards un-clickable)
 */
const disableDeck = () => {
    for (let cardId=min; cardId<=max; cardId++) {  
        document.getElementById(cardId).style.pointerEvents = "none";
    }
};

/**
 * Give a hint to the user about the number
 */
const generateRandomNumber = () => {
    correctNumber = Math.floor(Math.random()*(max-min+1)+min);
};

/**
 * Give a hint to the user about the number
 */
const giveHint = (guessedNumber) => {
    let hintDiv = document.createElement('div');
    hintDiv.className = 'danger';

    let hint = document.createElement('p');
    let hintText;

    if (guessedNumber > correctNumber) {
        hintText = `Your guess: ${guessedNumber} is too high\n`;
    } else {
        hintText = `Your guess: ${guessedNumber} is too low\n`;
    }
    hint.innerHTML = hintText;

    hintDiv.append(hint);    
    hints.appendChild(hintDiv);
};

/**
 * Game over hint
 */
 const giveGameOverHint = () => {
    let hintDiv = document.createElement('div');
    hintDiv.className = 'warning';

    let hint = document.createElement('p');
    let hintText = `Game Over! The correct number was ${correctNumber}`;

    hint.innerHTML = hintText;

    hintDiv.append(hint);    
    hints.appendChild(hintDiv);
};

/**
 * Game win hint
 */
 const giveGameWinHint = () => {
    gameWon = true;

    let hintDiv = document.createElement('div');
    hintDiv.className = 'info';

    let hint = document.createElement('p');
    let hintText = `Congratulations! The correct number is ${correctNumber}.`;

    hint.innerHTML = hintText;

    hintDiv.append(hint);    
    hints.appendChild(hintDiv);
};

/**
 * On click any card, this function executes
 */
const clickCard = (guessedNumber) => {
    if (attemptsLeft > 0) {
        attemptsLeft = attemptsLeft-1;
        remainingAttempts.innerHTML = attemptsLeft;
    
        if (guessedNumber === correctNumber) {
            // Disable clicking any card
            disableDeck();
            document.getElementById(guessedNumber).style.backgroundColor = 'green';
            giveGameWinHint();
        } else {
            document.getElementById(guessedNumber).style.backgroundColor = 'red';
            giveHint(guessedNumber);
        }
    
        if (attemptsLeft <= 0) {
            // Disable clicking any card
            disableDeck();
            !gameWon && giveGameOverHint();
        }
    }
};

startGame();