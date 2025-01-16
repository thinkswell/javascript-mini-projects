class SudokuSolver {
  constructor() {
    this.N = 9; 
  }

  isSafe(row, col, val, grid) {
    for (let i = 0; i < this.N; i++) {
      if (
        grid[row][i] === val ||
        grid[i][col] === val ||
        grid[Math.floor(row / 3) * 3 + Math.floor(i / 3)][
          Math.floor(col / 3) * 3 + (i % 3)
        ] === val
      ) {
        return false;
      }
    }
    return true;
  }

  solve(grid) {
    for (let i = 0; i < this.N; i++) {
      for (let j = 0; j < this.N; j++) {
        if (grid[i][j] === 0) {
          for (let k = 1; k <= 9; k++) {
            if (this.isSafe(i, j, k, grid)) {
              grid[i][j] = k;
              let solvePossible = this.solve(grid);
              if (solvePossible) {
                return true;
              } else {
                grid[i][j] = 0;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solveSudoku(grid) {
    return this.solve(grid);
  }
}

function initializeSudokuTable() {
  const sudokuTable = document.getElementById("sudokuTable");
  for (let i = 0; i < 9; i++) {
    const row = sudokuTable.insertRow(i);
    for (let j = 0; j < 9; j++) {
      const cell = row.insertCell(j);
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.className =
        "w-full h-full text-center text-lg border-none focus:ring-2 focus:ring-blue-500";
      input.addEventListener("input", validateInput);
      cell.appendChild(input);
    }
  }
}

function validateInput(event) {
  const inputValue = event.target.value;
  event.target.value = inputValue.replace(/[^1-9]/g, "");
}

function getSudokuPuzzle() {
  const puzzle = [];
  const rows = document.getElementById("sudokuTable").rows;
  for (let i = 0; i < 9; i++) {
    const row = rows[i];
    const rowData = [];
    for (let j = 0; j < 9; j++) {
      const input = row.cells[j].querySelector("input");
      rowData.push(parseInt(input.value) || 0);
    }
    puzzle.push(rowData);
  }
  return puzzle;
}

function displaySolvedPuzzle(solvedPuzzle) {
  const rows = document.getElementById("sudokuTable").rows;
  for (let i = 0; i < 9; i++) {
    const row = rows[i];
    for (let j = 0; j < 9; j++) {
      const input = row.cells[j].querySelector("input");
      input.value = solvedPuzzle[i][j];
    }
  }
}

function solveSudoku() {
  const sudokuSolver = new SudokuSolver();
  const puzzle = getSudokuPuzzle();

  if (sudokuSolver.solveSudoku(puzzle)) {
    displaySolvedPuzzle(puzzle);
  } else {
    alert("No solution exists.");
  }
}

function resetSudokuTable() {
  const inputs = document.querySelectorAll("#sudokuTable input");
  inputs.forEach((input) => (input.value = ""));
}

initializeSudokuTable();
