const BOARD_SIZE = 15;
const boardElement = document.getElementById("board");
const rollBtn = document.getElementById("roll-btn");
const diceView = document.getElementById("dice-view");
const turnIndicator = document.getElementById("turn-indicator");
const msgElement = document.getElementById("msg");

const PLAYERS = ["red", "green", "yellow", "blue"];
let currentTurnIdx = 0;
let lastRoll = 0;
let hasRolled = false;

// Common outer track coordinates (row, col)
const TRACK = [
  [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
  [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6],
  [0, 7], [0, 8],
  [1, 8], [2, 8], [3, 8], [4, 8], [5, 8],
  [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14],
  [7, 14], [8, 14],
  [8, 13], [8, 12], [8, 11], [8, 10], [8, 9],
  [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
  [14, 7], [14, 6],
  [13, 6], [12, 6], [11, 6], [10, 6], [9, 6],
  [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
  [7, 0], [6, 0]
];

// Token states: -1 means in base home, 0..51 are track positions, 52 is home goal
const gameState = {
  red:    { basePos: [2, 2],   tokens: [-1, -1] },
  green:  { basePos: [2, 12],  tokens: [-1, -1] },
  yellow: { basePos: [12, 12], tokens: [-1, -1] },
  blue:   { basePos: [12, 2],  tokens: [-1, -1] }
};

const START_OFFSETS = { red: 0, green: 13, yellow: 26, blue: 39 };

function initBoard() {
  boardElement.innerHTML = "";
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = r;
      cell.dataset.col = c;

      if (r < 6 && c < 6) cell.classList.add("red-base");
      else if (r < 6 && c > 8) cell.classList.add("green-base");
      else if (r > 8 && c > 8) cell.classList.add("yellow-base");
      else if (r > 8 && c < 6) cell.classList.add("blue-base");
      else if (r >= 6 && r <= 8 && c >= 6 && c <= 8) cell.classList.add("center-cell");
      else if (r === 7 && c > 0 && c < 6) cell.classList.add("red-path");
      else if (c === 7 && r > 0 && r < 6) cell.classList.add("green-path");
      else if (r === 7 && c > 8 && c < 14) cell.classList.add("yellow-path");
      else if (c === 7 && r > 8 && r < 14) cell.classList.add("blue-path");

      boardElement.appendChild(cell);
    }
  }
  renderTokens();
}

function getCell(r, c) {
  return document.querySelector(`[data-row='${r}'][data-col='${c}']`);
}

function renderTokens() {
  document.querySelectorAll(".token").forEach((t) => t.remove());

  PLAYERS.forEach((player) => {
    gameState[player].tokens.forEach((stepPos, tIdx) => {
      if (stepPos === 52) return; // Reached goal

      const tokenEl = document.createElement("div");
      tokenEl.className = `token ${player}`;
      tokenEl.id = `${player}-token-${tIdx}`;

      if (hasRolled && player === PLAYERS[currentTurnIdx]) {
        if (canMoveToken(player, stepPos, lastRoll)) {
          tokenEl.classList.add("clickable");
          tokenEl.onclick = () => moveToken(player, tIdx);
        }
      }

      let targetCell = null;
      if (stepPos === -1) {
        const [br, bc] = gameState[player].basePos;
        targetCell = getCell(br, bc + tIdx);
      } else {
        const actualIdx = (stepPos + START_OFFSETS[player]) % TRACK.length;
        const [tr, tc] = TRACK[actualIdx];
        targetCell = getCell(tr, tc);
      }

      if (targetCell) targetCell.appendChild(tokenEl);
    });
  });
}

function canMoveToken(player, stepPos, roll) {
  if (stepPos === -1) return roll === 6;
  return stepPos + roll <= 52;
}

rollBtn.addEventListener("click", () => {
  if (hasRolled) return;
  lastRoll = Math.floor(Math.random() * 6) + 1;
  diceView.textContent = lastRoll;
  hasRolled = true;
  rollBtn.disabled = true;

  const currentPlayer = PLAYERS[currentTurnIdx];
  const canAnyMove = gameState[currentPlayer].tokens.some((pos) =>
    canMoveToken(currentPlayer, pos, lastRoll)
  );

  if (!canAnyMove) {
    msgElement.textContent = `No moves possible for ${currentPlayer}. Turn switches.`;
    setTimeout(switchTurn, 1000);
  } else {
    msgElement.textContent = `${currentPlayer.toUpperCase()} rolled a ${lastRoll}! Select a piece.`;
    renderTokens();
  }
});

function moveToken(player, tokenIdx) {
  const currentPos = gameState[player].tokens[tokenIdx];
  if (currentPos === -1) {
    gameState[player].tokens[tokenIdx] = 0;
  } else {
    gameState[player].tokens[tokenIdx] = Math.min(52, currentPos + lastRoll);
  }

  // Check captures
  checkCapture(player, gameState[player].tokens[tokenIdx]);

  // Check win condition
  if (gameState[player].tokens.every((pos) => pos === 52)) {
    msgElement.textContent = `🎉 Player ${player.toUpperCase()} wins the game!`;
    rollBtn.disabled = true;
    renderTokens();
    return;
  }

  if (lastRoll === 6) {
    msgElement.textContent = `Rolled a 6! Roll again.`;
    hasRolled = false;
    rollBtn.disabled = false;
    renderTokens();
  } else {
    switchTurn();
  }
}

function checkCapture(activePlayer, pos) {
  if (pos <= 0 || pos >= 52) return;
  const activeActual = (pos + START_OFFSETS[activePlayer]) % TRACK.length;

  PLAYERS.forEach((other) => {
    if (other === activePlayer) return;
    gameState[other].tokens.forEach((oPos, idx) => {
      if (oPos > 0 && oPos < 52) {
        const otherActual = (oPos + START_OFFSETS[other]) % TRACK.length;
        if (activeActual === otherActual) {
          gameState[other].tokens[idx] = -1;
          msgElement.textContent = `${activePlayer.toUpperCase()} captured ${other.toUpperCase()}!`;
        }
      }
    });
  });
}

function switchTurn() {
  currentTurnIdx = (currentTurnIdx + 1) % PLAYERS.length;
  hasRolled = false;
  rollBtn.disabled = false;

  const nextPlayer = PLAYERS[currentTurnIdx];
  turnIndicator.textContent = nextPlayer.charAt(0).toUpperCase() + nextPlayer.slice(1);
  turnIndicator.className = `turn-${nextPlayer}`;
  msgElement.textContent = `Turn switched to ${nextPlayer}. Roll the dice!`;
  renderTokens();
}

initBoard();