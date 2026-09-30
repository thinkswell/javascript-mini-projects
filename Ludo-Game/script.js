"use strict";

/* -------------------------------------------------
   Player and game configuration
------------------------------------------------- */

const PLAYER_DATA = [
    {
        name: "Red",
        color: "red",
        hex: "#e63946",
        start: 0
    },
    {
        name: "Green",
        color: "green",
        hex: "#2a9d62",
        start: 13
    },
    {
        name: "Yellow",
        color: "yellow",
        hex: "#f4b942",
        start: 26
    },
    {
        name: "Blue",
        color: "blue",
        hex: "#2878d0",
        start: 39
    }
];

const TRACK_LENGTH = 52;

/* Tokens cannot be captured on these cells. */
const SAFE_CELLS = new Set([
    0, 8, 13, 21, 26, 34, 39, 47
]);

const DICE_FACES = [
    "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"
];


/* -------------------------------------------------
   Select HTML elements
------------------------------------------------- */

const setupCard =
    document.querySelector("#setupCard");

const gameSection =
    document.querySelector("#game");

const track =
    document.querySelector("#track");

const tokensLayer =
    document.querySelector("#tokensLayer");

const turnBanner =
    document.querySelector("#turnBanner");

const diceElement =
    document.querySelector("#dice");

const rollButton =
    document.querySelector("#rollButton");

const message =
    document.querySelector("#message");

const scoreboard =
    document.querySelector("#scoreboard");

const winnerModal =
    document.querySelector("#winnerModal");

const winnerText =
    document.querySelector("#winnerText");


/* -------------------------------------------------
   Game variables
------------------------------------------------- */

let playerCount = 2;
let players = [];
let currentPlayer = 0;
let diceValue = 0;
let waitingForToken = false;
let gameOver = false;
let trackPositions = [];


/* -------------------------------------------------
   Player-selection buttons
------------------------------------------------- */

document
    .querySelectorAll(".player-option")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            document
                .querySelectorAll(".player-option")
                .forEach(function (item) {
                    item.classList.remove("selected");
                });

            button.classList.add("selected");

            playerCount =
                Number(button.dataset.count);
        });
    });


/* -------------------------------------------------
   Main button events
------------------------------------------------- */

document
    .querySelector("#startButton")
    .addEventListener("click", startGame);

document
    .querySelector("#newGameButton")
    .addEventListener("click", showSetup);

document
    .querySelector("#playAgainButton")
    .addEventListener("click", function () {

        winnerModal.classList.add("hidden");

        startGame();
    });

rollButton.addEventListener(
    "click",
    rollDice
);

window.addEventListener(
    "resize",
    renderTokens
);


/* -------------------------------------------------
   Create the 52-cell Ludo track
------------------------------------------------- */

function createTrack() {

    track.innerHTML = "";

    trackPositions = [];

    const centre = 50;
    const radius = 43;

    for (
        let index = 0;
        index < TRACK_LENGTH;
        index++
    ) {
        const angle =
            -Math.PI / 2 +
            (index / TRACK_LENGTH) *
            Math.PI *
            2;

        const x =
            centre +
            Math.cos(angle) * radius;

        const y =
            centre +
            Math.sin(angle) * radius;

        trackPositions.push({
            x: x,
            y: y
        });

        const cell =
            document.createElement("div");

        cell.className = "cell";

        cell.dataset.index = index;

        cell.style.left = x + "%";
        cell.style.top = y + "%";

        if (SAFE_CELLS.has(index)) {
            cell.classList.add("safe");
            cell.textContent = "◆";
        }

        const startOwner =
            PLAYER_DATA.find(function (player) {
                return player.start === index;
            });

        if (startOwner) {
            cell.classList.add(
                "start-" + startOwner.color
            );

            cell.textContent = "★";
        }

        track.appendChild(cell);
    }
}


/* -------------------------------------------------
   Start or restart the game
------------------------------------------------- */

function startGame() {

    players =
        PLAYER_DATA
            .slice(0, playerCount)
            .map(function (playerData, playerIndex) {

                return {
                    name: playerData.name,
                    color: playerData.color,
                    hex: playerData.hex,
                    start: playerData.start,

                    tokens: Array
                        .from(
                            { length: 4 },
                            function (_, tokenIndex) {

                                return {
                                    id:
                                        playerIndex +
                                        "-" +
                                        tokenIndex,

                                    /*
                                    -1 means the token is at home.
                                    0–51 means it is on the track.
                                    52 means it has finished.
                                    */
                                    progress: -1
                                };
                            }
                        )
                };
            });

    currentPlayer = 0;
    diceValue = 0;
    waitingForToken = false;
    gameOver = false;

    diceElement.textContent = "–";

    diceElement.setAttribute(
        "aria-label",
        "Dice has not been rolled"
    );

    rollButton.disabled = false;

    winnerModal.classList.add("hidden");
    setupCard.classList.add("hidden");
    gameSection.classList.remove("hidden");

    PLAYER_DATA.forEach(
        function (_, index) {

            const home =
                document.querySelector(
                    "#home-" + index
                );

            home.classList.toggle(
                "inactive-home",
                index >= playerCount
            );
        }
    );

    createTrack();
    renderTokens();

    updateInterface(
        "Roll the dice to begin."
    );
}


/* -------------------------------------------------
   Return to the player-selection screen
------------------------------------------------- */

function showSetup() {

    gameOver = true;

    winnerModal.classList.add("hidden");
    gameSection.classList.add("hidden");
    setupCard.classList.remove("hidden");
}


/* -------------------------------------------------
   Roll the dice
------------------------------------------------- */

function rollDice() {

    if (waitingForToken || gameOver) {
        return;
    }

    rollButton.disabled = true;

    diceElement.classList.add("rolling");

    diceElement.textContent = "?";

    window.setTimeout(
        function () {

            diceValue =
                Math.floor(
                    Math.random() * 6
                ) + 1;

            diceElement.textContent =
                DICE_FACES[diceValue - 1];

            diceElement.setAttribute(
                "aria-label",
                "Dice rolled " + diceValue
            );

            diceElement.classList.remove(
                "rolling"
            );

            handleRoll();
        },
        480
    );
}


/* -------------------------------------------------
   Process the dice result
------------------------------------------------- */

function handleRoll() {

    const player =
        players[currentPlayer];

    const movableTokens =
        getMovableTokens(
            player,
            diceValue
        );

    /*
    If no token can move, either give another roll
    after a six or move to the next player.
    */
    if (movableTokens.length === 0) {

        updateInterface(
            player.name +
            " rolled " +
            diceValue +
            ", but no token can move."
        );

        window.setTimeout(
            function () {

                if (diceValue === 6) {

                    updateInterface(
                        "You rolled a six. Roll again!"
                    );

                    rollButton.disabled = false;
                } else {
                    nextTurn();
                }
            },
            900
        );

        return;
    }

    /*
    If only one token can move, move it automatically.
    */
    if (movableTokens.length === 1) {

        const tokenIndex =
            player.tokens.indexOf(
                movableTokens[0]
            );

        moveToken(
            currentPlayer,
            tokenIndex
        );

        return;
    }

    /*
    If several tokens can move, allow the player
    to select one of the glowing tokens.
    */
    waitingForToken = true;

    updateInterface(
        "You rolled " +
        diceValue +
        ". Select a glowing token."
    );

    renderTokens();
}


/* -------------------------------------------------
   Find tokens that can legally move
------------------------------------------------- */

function getMovableTokens(player, roll) {

    return player.tokens.filter(
        function (token) {

            /*
            A finished token cannot move again.
            */
            if (token.progress === 52) {
                return false;
            }

            /*
            A token can leave home only after rolling 6.
            */
            if (token.progress === -1) {
                return roll === 6;
            }

            /*
            The roll must not move the token
            beyond the finishing position.
            */
            return (
                token.progress + roll <= 52
            );
        }
    );
}


/* -------------------------------------------------
   Move a selected token
------------------------------------------------- */

function moveToken(
    playerIndex,
    tokenIndex
) {

    if (gameOver) {
        return;
    }

    const player =
        players[playerIndex];

    const token =
        player.tokens[tokenIndex];

    const oldProgress =
        token.progress;

    /*
    Bring the token onto the starting cell
    when the player rolls a six.
    */
    if (token.progress === -1) {
        token.progress = 0;
    } else {
        token.progress += diceValue;
    }

    waitingForToken = false;

    let captured = false;

    /*
    Check captures only when the token is
    currently on the main track.
    */
    if (
        token.progress >= 0 &&
        token.progress < 52
    ) {
        captured =
            captureOpponent(
                playerIndex,
                token
            );
    }

    renderTokens();
    updateScoreboard();

    /*
    Check whether all four tokens finished.
    */
    const playerWon =
        player.tokens.every(
            function (item) {
                return item.progress === 52;
            }
        );

    if (playerWon) {
        finishGame(player);
        return;
    }

    /*
    Display the result of the move.
    */
    if (token.progress === 52) {

        updateInterface(
            player.name +
            "'s token reached the finish!"
        );

    } else if (oldProgress === -1) {

        updateInterface(
            player.name +
            " brought a token onto the board."
        );

    } else if (captured) {

        updateInterface(
            player.name +
            " captured an opponent's token!"
        );

    } else {

        updateInterface(
            player.name +
            " moved " +
            diceValue +
            " spaces."
        );
    }

    /*
    The player gets another turn after rolling
    six or capturing another token.
    */
    window.setTimeout(
        function () {

            if (
                diceValue === 6 ||
                captured
            ) {
                updateInterface(
                    player.name +
                    " gets another roll!"
                );

                rollButton.disabled = false;
            } else {
                nextTurn();
            }
        },
        650
    );
}


/* -------------------------------------------------
   Capture opponent tokens
------------------------------------------------- */

function captureOpponent(
    activePlayerIndex,
    movedToken
) {

    const cellIndex =
        getBoardIndex(
            activePlayerIndex,
            movedToken.progress
        );

    /*
    No capture is allowed on a safe cell.
    */
    if (SAFE_CELLS.has(cellIndex)) {
        return false;
    }

    let captured = false;

    players.forEach(
        function (player, playerIndex) {

            if (
                playerIndex ===
                activePlayerIndex
            ) {
                return;
            }

            player.tokens.forEach(
                function (token) {

                    const tokenIsOnTrack =
                        token.progress >= 0 &&
                        token.progress < 52;

                    if (!tokenIsOnTrack) {
                        return;
                    }

                    const opponentCell =
                        getBoardIndex(
                            playerIndex,
                            token.progress
                        );

                    if (
                        opponentCell ===
                        cellIndex
                    ) {
                        /*
                        Send the captured token home.
                        */
                        token.progress = -1;
                        captured = true;
                    }
                }
            );
        }
    );

    return captured;
}


/* -------------------------------------------------
   Convert token progress into a board-cell index
------------------------------------------------- */

function getBoardIndex(
    playerIndex,
    progress
) {

    return (
        players[playerIndex].start +
        progress
    ) % TRACK_LENGTH;
}


/* -------------------------------------------------
   Change to the next player's turn
------------------------------------------------- */

function nextTurn() {

    currentPlayer =
        (currentPlayer + 1) %
        players.length;

    diceValue = 0;
    waitingForToken = false;

    rollButton.disabled = false;

    updateInterface(
        players[currentPlayer].name +
        "'s turn. Roll the dice."
    );

    renderTokens();
}


/* -------------------------------------------------
   Display every player's tokens
------------------------------------------------- */

function renderTokens() {

    tokensLayer.innerHTML = "";

    if (
        players.length === 0 ||
        trackPositions.length === 0
    ) {
        return;
    }

    players.forEach(
        function (player, playerIndex) {

            player.tokens.forEach(
                function (token, tokenIndex) {

                    const tokenElement =
                        document.createElement(
                            "button"
                        );

                    tokenElement.type =
                        "button";

                    tokenElement.className =
                        "token " +
                        player.color;

                    tokenElement.setAttribute(
                        "aria-label",
                        player.name +
                        " token " +
                        (tokenIndex + 1)
                    );

                    const position =
                        getTokenPosition(
                            playerIndex,
                            tokenIndex,
                            token
                        );

                    tokenElement.style.left =
                        position.x + "%";

                    tokenElement.style.top =
                        position.y + "%";

                    const movableTokens =
                        getMovableTokens(
                            player,
                            diceValue
                        );

                    const canMove =
                        waitingForToken &&
                        playerIndex ===
                            currentPlayer &&
                        movableTokens.includes(
                            token
                        );

                    if (canMove) {

                        tokenElement.classList.add(
                            "movable"
                        );

                        tokenElement.addEventListener(
                            "click",
                            function () {

                                moveToken(
                                    playerIndex,
                                    tokenIndex
                                );
                            }
                        );

                    } else {

                        tokenElement.disabled = true;
                    }

                    if (
                        token.progress === 52
                    ) {
                        tokenElement.classList.add(
                            "finished"
                        );
                    }

                    tokensLayer.appendChild(
                        tokenElement
                    );
                }
            );
        }
    );
}


/* -------------------------------------------------
   Calculate each token's visual position
------------------------------------------------- */

function getTokenPosition(
    playerIndex,
    tokenIndex,
    token
) {

    /*
    Positions of tokens while inside their homes.
    */
    if (token.progress === -1) {

        const homes = [
            { x: 19, y: 19 },
            { x: 81, y: 19 },
            { x: 81, y: 81 },
            { x: 19, y: 81 }
        ];

        const offsets = [
            { x: -4, y: -4 },
            { x: 4, y: -4 },
            { x: -4, y: 4 },
            { x: 4, y: 4 }
        ];

        return {
            x:
                homes[playerIndex].x +
                offsets[tokenIndex].x,

            y:
                homes[playerIndex].y +
                offsets[tokenIndex].y
        };
    }

    /*
    Positions of tokens after reaching the finish.
    */
    if (token.progress === 52) {

        const finishPositions = [
            { x: 46, y: 46 },
            { x: 54, y: 46 },
            { x: 54, y: 54 },
            { x: 46, y: 54 }
        ];

        const smallOffsets = [
            { x: -1.6, y: -1.6 },
            { x: 1.6, y: -1.6 },
            { x: -1.6, y: 1.6 },
            { x: 1.6, y: 1.6 }
        ];

        const finish =
            finishPositions[playerIndex];

        return {
            x:
                finish.x +
                smallOffsets[tokenIndex].x,

            y:
                finish.y +
                smallOffsets[tokenIndex].y
        };
    }

    /*
    Position of a token on the track.
    */
    const boardIndex =
        getBoardIndex(
            playerIndex,
            token.progress
        );

    const cell =
        trackPositions[boardIndex];

    /*
    Small offsets ensure that several tokens on
    one cell remain visible.
    */
    const stackOffsets = [
        { x: -1.2, y: -1.2 },
        { x: 1.2, y: -1.2 },
        { x: -1.2, y: 1.2 },
        { x: 1.2, y: 1.2 }
    ];

    return {
        x:
            cell.x +
            stackOffsets[tokenIndex].x,

        y:
            cell.y +
            stackOffsets[tokenIndex].y
    };
}


/* -------------------------------------------------
   Update turn, message and scoreboard
------------------------------------------------- */

function updateInterface(text) {

    if (players.length === 0) {
        return;
    }

    const player =
        players[currentPlayer];

    message.textContent = text;

    turnBanner.textContent =
        player.name + "'s turn";

    turnBanner.style.background =
        player.hex;

    updateScoreboard();
}


/* -------------------------------------------------
   Update player progress
------------------------------------------------- */

function updateScoreboard() {

    scoreboard.innerHTML =
        players
            .map(function (player) {

                const finished =
                    player.tokens.filter(
                        function (token) {
                            return (
                                token.progress ===
                                52
                            );
                        }
                    ).length;

                const active =
                    player.tokens.filter(
                        function (token) {
                            return (
                                token.progress >= 0 &&
                                token.progress < 52
                            );
                        }
                    ).length;

                return `
                    <div
                        class="score-row"
                        style="border-color: ${player.hex}"
                    >
                        <strong>
                            ${player.name}
                        </strong>

                        <span>
                            ${active} active ·
                            ${finished}/4 home
                        </span>
                    </div>
                `;
            })
            .join("");
}


/* -------------------------------------------------
   Finish the game
------------------------------------------------- */

function finishGame(player) {

    gameOver = true;

    rollButton.disabled = true;

    winnerText.textContent =
        player.name +
        " brought all four tokens home and won the game!";

    winnerModal.classList.remove("hidden");
}