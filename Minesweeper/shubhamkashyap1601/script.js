const gridSize = 10;
const totalMines = 20;
let remainingFlags = totalMines;
let revealedCount = 0;
let highscore = parseInt(localStorage.getItem("highscore")) || 0;

const grid = document.getElementById("grid");
const bombCountDisplay = document.getElementById("bomb-count");
const resultDisplay = document.getElementById("result");
const retryButton = document.getElementById("retry-button");
const highscoreDisplay = document.getElementById("highscore");

let mines = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
let revealed = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
let flagged = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));

function resetGame() {
    mines = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
    revealed = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
    flagged = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
    plantMines();
    remainingFlags = totalMines;
    revealedCount = 0;
    resultDisplay.textContent = "";
    bombCountDisplay.textContent = `Bombs: ${remainingFlags}`;
    updateHighscore();
    createGrid();
}

retryButton.addEventListener("click", resetGame);

function updateHighscore() {
    if (revealedCount === gridSize * gridSize - totalMines && remainingFlags >= 0) {
        if (remainingFlags > highscore) {
            highscore = remainingFlags;
            localStorage.setItem("highscore", highscore);
        }
        highscoreDisplay.textContent = `Highscore: ${highscore}`;
    }
}

function plantMines() {
    let plantedMines = 0;
    while (plantedMines < totalMines) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        if (!mines[x][y]) {
            mines[x][y] = true;
            plantedMines++;
        }
    }
}

function countAdjacentMines(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newX = x + i;
            const newY = y + j;
            if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize && mines[newX][newY]) {
                count++;
            }
        }
    }
    return count;
}

function revealCell(x, y) {
    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize || revealed[x][y] || flagged[x][y]) {
        return;
    }
    revealed[x][y] = true;
    const cell = document.getElementById(`cell-${x}-${y}`);
    cell.classList.add("revealed");
    revealedCount++;

    if (mines[x][y]) {
        cell.classList.add("mine");
        resultDisplay.textContent = "Game Over! You stepped on a mine!";
        return;
    }

    const minesNearby = countAdjacentMines(x, y);
    if (minesNearby > 0) {
        cell.textContent = minesNearby;
    } else {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                revealCell(x + i, y + j);
            }
        }
    }

    if (revealedCount === gridSize * gridSize - totalMines) {
        resultDisplay.textContent = "Congratulations! You Win!";
    }
}

function handleCellClick(x, y) {
    if (revealed[x][y] || flagged[x][y]) {
        return;
    }
    revealCell(x, y);
}

function handleCellRightClick(event, x, y) {
    event.preventDefault();
    if (!revealed[x][y]) {
        flagged[x][y] = !flagged[x][y];
        const cell = document.getElementById(`cell-${x}-${y}`);
        if (flagged[x][y]) {
            cell.classList.add("flag");
            remainingFlags--;
        } else {
            cell.classList.remove("flag");
            remainingFlags++;
        }
        bombCountDisplay.textContent = `Bombs: ${remainingFlags}`;
    }
}

function createGrid() {
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            const cell = document.createElement("div");
            cell.className = "grid-item";
            cell.id = `cell-${x}-${y}`;
            cell.addEventListener("click", () => handleCellClick(x, y));
            cell.addEventListener("contextmenu", (e) => handleCellRightClick(e, x, y));
            grid.appendChild(cell);
        }
    }
}

plantMines();
createGrid();
