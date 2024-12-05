import { BASE_POSITIONS, HOME_ENTRANCE, HOME_POSITIONS, PLAYERS, SAFE_POSITIONS, START_POSITIONS, STATE, TURNING_POINTS } from './constants.js';
import { UI } from './UI.js';

// Define the custom turn order
const TURN_ORDER = [0, 2, 1, 3];

// Dice roll elements and function
const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.roll');
const resultDisplay = document.querySelector('.result');

const randomDice = () => {
    const random = Math.floor(Math.random() * 6) + 1; // Generates a number between 1 and 6
    rollDice(random);
    return random;
}

const rollDice = (random) => {
    dice.style.animation = 'rolling 1s'; // Set a faster animation duration

    setTimeout(() => {
        // Show the dice face based on the random number
        switch (random) {
            case 1:
                dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                break;
            case 2:
                dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                break;
            case 3:
                dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                break;
            case 4:
                dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                break;
            case 5:
                dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                break;
            case 6:
                dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                break;
            default:
                break;
        }

        dice.style.animation = 'none'; // Stop the animation after it completes

        // Display the result
        resultDisplay.textContent = `Result: ${random}`;
    }, 1050); // Slightly more than the animation duration
}

export class Ludo {
    currentPositions = {
        P1: [],
        P2: [],
        P3: [],
        P4: []
    };

    _diceValue;
    get diceValue() {
        return this._diceValue;
    }
    set diceValue(value) {
        this._diceValue = value;
        UI.setDiceValue(value);
    }

    _turn;
    get turn() {
        return this._turn;
    }
    set turn(value) {
        this._turn = value;
        UI.setTurn(value);
    }

    _state;
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;

        if (value === STATE.DICE_NOT_ROLLED) {
            UI.enableDice();
            UI.unhighlightPieces();
        } else {
            UI.disableDice();
        }
    }

    constructor() {
        console.log('Hello World! Lets play Ludo!');

        // Initialize the turn index to -1, so the first call to incrementTurn sets it to the first player
        this.turnIndex = -1;
        this.incrementTurn(); // Start the game with the first player
        this.listenRollButtonClick();
        this.listenResetClick();
        this.listenPieceClick();

        this.resetGame();
    }

    listenRollButtonClick() {
        rollBtn.addEventListener('click', this.onDiceClick.bind(this));
    }

    onDiceClick() {
        console.log('dice clicked!');
        this.diceValue = randomDice(); // Animate the dice and set the value
        this.state = STATE.DICE_ROLLED;
        this.checkForEligiblePieces();
    }

    checkForEligiblePieces() {
        const player = PLAYERS[this.turn];
        const eligiblePieces = this.getEligiblePieces(player);
        if (eligiblePieces.length) {
            // Highlight the pieces
            UI.highlightPieces(player, eligiblePieces);
        } else {
            this.incrementTurn();
        }
    }

    incrementTurn() {
        // Increment the turn index and follow the custom turn order
        this.turnIndex = (this.turnIndex + 1) % TURN_ORDER.length;
        this.turn = TURN_ORDER[this.turnIndex];
        this.state = STATE.DICE_NOT_ROLLED;
    }

    getEligiblePieces(player) {
        return [0, 1, 2, 3].filter(piece => {
            const currentPosition = this.currentPositions[player][piece];

            if (currentPosition === HOME_POSITIONS[player]) {
                return false;
            }

            if (
                BASE_POSITIONS[player].includes(currentPosition) &&
                this.diceValue !== 6
            ) {
                return false;
            }

            if (
                HOME_ENTRANCE[player].includes(currentPosition) &&
                this.diceValue > HOME_POSITIONS[player] - currentPosition
            ) {
                return false;
            }

            return true;
        });
    }

    listenResetClick() {
        UI.listenResetClick(this.resetGame.bind(this));
    }

    resetGame() {
        console.log('reset game');
        this.currentPositions = structuredClone(BASE_POSITIONS);
        PLAYERS.forEach(player => {
            [0, 1, 2, 3].forEach(piece => {
                this.setPiecePosition(player, piece, this.currentPositions[player][piece]);
            });
        });
        this.turnIndex = -1; // Start from the first player on reset
        this.incrementTurn(); // Ensure the first player is selected
        this.state = STATE.DICE_NOT_ROLLED;
    }

    listenPieceClick() {
        UI.listenPieceClick(this.onPieceClick.bind(this));
    }

    
    onPieceClick(event) {
        const target = event.target;

        if (!target.classList.contains('player-piece') || !target.classList.contains('highlight')) {
            return;
        }
        console.log('piece clicked');

        const player = target.getAttribute('player-id');
        const piece = target.getAttribute('piece');
        this.handlePieceClick(player, piece);
    }

    handlePieceClick(player, piece) {
        console.log(player, piece);
        const currentPosition = this.currentPositions[player][piece];

        if (BASE_POSITIONS[player].includes(currentPosition)) {
            this.setPiecePosition(player, piece, START_POSITIONS[player]);
            this.state = STATE.DICE_NOT_ROLLED;
            return;
        }

        UI.unhighlightPieces();
        this.movePiece(player, piece, this.diceValue);
    }

    setPiecePosition(player, piece, newPosition) {
        this.currentPositions[player][piece] = newPosition;
        UI.setPiecePosition(player, piece, newPosition);
    }

    movePiece(player, piece, moveBy) {
        const interval = setInterval(() => {
            this.incrementPiecePosition(player, piece);
            moveBy--;

            if (moveBy === 0) {
                clearInterval(interval);

                // Check if player won
                if (this.hasPlayerWon(player)) {
                    alert(`Player: ${player} has won!`);
                    this.resetGame();
                    return;
                }

                const isKill = this.checkForKill(player, piece);

                if (isKill || this.diceValue === 6) {
                    this.state = STATE.DICE_NOT_ROLLED;
                    return;
                }

                this.incrementTurn();
            }
        }, 200);
    }

    checkForKill(player, piece) {
        const currentPosition = this.currentPositions[player][piece];
        let kill = false;

        PLAYERS.forEach(opponent => {
            if (opponent !== player) {
                [0, 1, 2, 3].forEach(piece => {
                    const opponentPosition = this.currentPositions[opponent][piece];

                    if (currentPosition === opponentPosition && !SAFE_POSITIONS.includes(currentPosition)) {
                        this.setPiecePosition(opponent, piece, BASE_POSITIONS[opponent][piece]);
                        kill = true;
                    }
                });
            }
        });

        return kill;
    }

    hasPlayerWon(player) {
        return [0, 1, 2, 3].every(piece => this.currentPositions[player][piece] === HOME_POSITIONS[player]);
    }

    incrementPiecePosition(player, piece) {
        this.setPiecePosition(player, piece, this.getIncrementedPosition(player, piece));
    }

    getIncrementedPosition(player, piece) {
        const currentPosition = this.currentPositions[player][piece];

        if (currentPosition === TURNING_POINTS[player]) {
            return HOME_ENTRANCE[player][0];
        } else if (currentPosition === 51) {
            return 0;
        }
        return currentPosition + 1;
    }
}
