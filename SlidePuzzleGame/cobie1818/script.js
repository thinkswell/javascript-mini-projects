"use strict";

const board = document.getElementById("puzzle-board");
const moveCount = document.getElementById("move-count");
const gameStatus = document.getElementById("game-status");
const shuffleButton = document.getElementById("shuffle-button");

const GRID_SIZE = 3;
const SHUFFLE_STEPS = 100;
const SOLVED_TILES = [1, 2, 3, 4, 5, 6, 7, 8, 0];

let tiles = [...SOLVED_TILES];
let moves = 0;
let isPlaying = false;

// An original SVG landscape keeps the game usable without image downloads.
const landscape = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="sky" x2="0" y2="1">
        <stop offset="0%" stop-color="#254b70"/>
        <stop offset="100%" stop-color="#efb58b"/>
      </linearGradient>
      <linearGradient id="water" x2="0" y2="1">
        <stop offset="0%" stop-color="#629cad"/>
        <stop offset="100%" stop-color="#173b50"/>
      </linearGradient>
    </defs>

    <rect width="600" height="600" fill="url(#sky)"/>
    <circle cx="455" cy="125" r="55" fill="#ffe1a0"/>

    <path d="M0 320 L145 105 L300 320 Z" fill="#627b91"/>
    <path d="M75 210 L145 105 L218 211 L164 185 L135 204 Z"
          fill="#e8edf0"/>

    <path d="M180 335 L360 150 L570 335 Z" fill="#425d77"/>
    <path d="M290 223 L360 150 L431 223 L379 202 L349 217 Z"
          fill="#d8e5ed"/>

    <path d="M400 340 L550 220 L650 340 Z" fill="#324f63"/>

    <rect y="330" width="600" height="270" fill="url(#water)"/>

    <path d="M360 365 H510 M320 395 H540 M355 425 H490"
          fill="none" stroke="#edcb99" stroke-width="8"
          stroke-linecap="round"/>

    <path d="M0 340 Q110 310 190 370 L270 600 H0 Z"
          fill="#234d49"/>
    <path d="M600 390 Q500 350 435 455 L360 600 H600 Z"
          fill="#183c3a"/>

    <path d="M65 460 V285 M30 350 L65 285 L100 350
             M20 395 L65 320 L110 395"
          fill="#173b36" stroke="#173b36" stroke-width="12"
          stroke-linejoin="round"/>

    <path d="M525 540 V370 M490 430 L525 370 L560 430
             M478 482 L525 407 L572 482"
          fill="#102f30" stroke="#102f30" stroke-width="12"
          stroke-linejoin="round"/>
  </svg>
`;

const imageUrl = `data:image/svg+xml,${encodeURIComponent(landscape)}`;

document.documentElement.style.setProperty(
  "--puzzle-image",
  `url("${imageUrl}")`
);

// Return only positions directly above, below, left, or right.
function getNeighbors(index) {
  const row = Math.floor(index / GRID_SIZE);
  const column = index % GRID_SIZE;
  const neighbors = [];

  if (row > 0) neighbors.push(index - GRID_SIZE);
  if (row < GRID_SIZE - 1) neighbors.push(index + GRID_SIZE);
  if (column > 0) neighbors.push(index - 1);
  if (column < GRID_SIZE - 1) neighbors.push(index + 1);

  return neighbors;
}

function isSolved() {
  return tiles.every((tile, index) => tile === SOLVED_TILES[index]);
}

function swapTiles(firstIndex, secondIndex) {
  [tiles[firstIndex], tiles[secondIndex]] = [
    tiles[secondIndex],
    tiles[firstIndex]
  ];
}

function renderBoard(focusTile = null) {
  const fragment = document.createDocumentFragment();
  let buttonToFocus = null;

  tiles.forEach((tile, index) => {
    if (tile === 0) {
      const emptySpace = document.createElement("div");
      emptySpace.className = "empty-tile";
      emptySpace.setAttribute("role", "img");
      emptySpace.setAttribute("aria-label", "Empty space");
      fragment.appendChild(emptySpace);
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "tile";
    button.dataset.tile = String(tile);

    const currentRow = Math.floor(index / GRID_SIZE) + 1;
    const currentColumn = (index % GRID_SIZE) + 1;

    button.setAttribute(
      "aria-label",
      `Tile ${tile}, row ${currentRow}, column ${currentColumn}`
    );

    // Keep each tile's picture tied to its original solved position.
    const imageRow = Math.floor((tile - 1) / GRID_SIZE);
    const imageColumn = (tile - 1) % GRID_SIZE;

    button.style.backgroundPosition =
      `${imageColumn * 50}% ${imageRow * 50}%`;

    const number = document.createElement("span");
    number.className = "tile-number";
    number.textContent = String(tile);
    number.setAttribute("aria-hidden", "true");

    button.appendChild(number);
    fragment.appendChild(button);

    if (tile === focusTile) {
      buttonToFocus = button;
    }
  });

  board.replaceChildren(fragment);
  moveCount.textContent = String(moves);

  // Restore keyboard focus after rebuilding the board.
  if (buttonToFocus) {
    buttonToFocus.focus({ preventScroll: true });
  }
}

function moveTile(tile) {
  if (!isPlaying) {
    gameStatus.textContent = "Select Shuffle and start to begin a new game.";
    return;
  }

  const tileIndex = tiles.indexOf(tile);
  const emptyIndex = tiles.indexOf(0);

  if (tileIndex === -1 || !getNeighbors(emptyIndex).includes(tileIndex)) {
    gameStatus.textContent = "Choose a tile directly next to the empty space.";
    return;
  }

  swapTiles(tileIndex, emptyIndex);
  moves += 1;

  if (isSolved()) {
    isPlaying = false;
    gameStatus.textContent =
      `Puzzle complete! You finished in ${moves} moves.`;
  } else {
    gameStatus.textContent = `Tile ${tile} moved. Keep going!`;
  }

  renderBoard(tile);
}

function shufflePuzzle() {
  tiles = [...SOLVED_TILES];

  let emptyIndex = tiles.indexOf(0);
  let previousEmptyIndex = -1;

  // Legal moves from the solved board guarantee a solvable puzzle.
  for (let step = 0; step < SHUFFLE_STEPS; step += 1) {
    const choices = getNeighbors(emptyIndex).filter(
      (index) => index !== previousEmptyIndex
    );

    const nextIndex = choices[Math.floor(Math.random() * choices.length)];

    swapTiles(emptyIndex, nextIndex);
    previousEmptyIndex = emptyIndex;
    emptyIndex = nextIndex;
  }

  // A shuffle must not leave the player with an already completed board.
  if (isSolved()) {
    const nextIndex = getNeighbors(emptyIndex)[0];
    swapTiles(emptyIndex, nextIndex);
  }

  moves = 0;
  isPlaying = true;
  gameStatus.textContent = "Puzzle shuffled! Move a tile next to the empty space.";
  renderBoard();
}

// Native buttons support mouse, touch, Enter, and Space.
board.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-tile]");

  if (!button || !board.contains(button)) {
    return;
  }

  moveTile(Number(button.dataset.tile));
});

shuffleButton.addEventListener("click", shufflePuzzle);

renderBoard();