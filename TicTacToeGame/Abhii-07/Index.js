const cellElements = document.querySelectorAll('[data-cell]');
const undoBtn = document.getElementById('undo-btn');
const board = document.getElementById('board');
const wMessageElement = document.getElementById('wMessage');
const wMessageTextElement = document.getElementById('text');
const xClass = 'x';
const circClass = 'circle';
const combo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;
let lastSelectedCell;
let rival;
load();

function load() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(xClass);
    cell.classList.remove(circClass);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick);
  });
  setBoardHoverClass();
  undoBtn.addEventListener('click', undo);
  wMessageElement.classList.remove('show');
}

function undo() {
  undoBtn.disabled = true;
  swap();
  lastSelectedCell.classList.remove('x');
  lastSelectedCell.classList.remove('circle');
  lastSelectedCell.childNodes.forEach(function (child) {
    lastSelectedCell.removeChild(child);
  });
}

function handleClick(e, el) {
  const cell = e.target || el;
  const currentClass = circleTurn ? circClass : xClass;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    isEnd(false);
    return;
  } else if (isDraw()) {
    isEnd(true);
    return;
  } else {
    swap();
    setBoardHoverClass();
  }
  if (rival === 'computer' && e) {
    board.classList.add('disabled');
    setTimeout(function () {
      computerMove();
    }, 500);
  }
}

function computerMove() {
  let pick = Math.round(Math.random() * 8);
  let selectedCell = cellElements[pick];

  while (
    selectedCell.classList.value.indexOf('x') > -1 ||
    selectedCell.classList.value.indexOf('circle') > -1
  ) {
    console.log('yes');
    pick = Math.round(Math.random() * 8);
    selectedCell = cellElements[pick];
  }
  board.classList.remove('disabled');
  handleClick(false, selectedCell);

}

function setRival(_rival) {
  rival = _rival;
  document.getElementById('loading-screen').style.display = 'none';
  document.getElementById('game-box').style.display = 'block';
  if (rival === 'computer') {
    undoBtn.style.display = 'none';
  }
}

function isEnd(draw) {
  if (draw) {
    wMessageTextElement.innerText = 'Draw';
  } else {
    wMessageTextElement.innerText = `Winner is: ${circleTurn ? 'O' : 'X'}`;
  }
  wMessageElement.classList.add('show');
  board.classList.add('game-ended');
  undoBtn.disabled = true;
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(xClass) || cell.classList.contains(circClass)
    );
  });
}

function placeMark(cell, currentClass) {
  lastSelectedCell = cell;
  undoBtn.disabled = false;
  cell.classList.add(currentClass);
}

function swap() {
  circleTurn = !circleTurn;
}

function checkWin(currentClass) {
  return combo.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function setBoardHoverClass() {
  board.classList.remove(xClass);
  board.classList.remove(circClass);
  if (circleTurn) {
    board.classList.add(circClass);
  } else {
    board.classList.add(xClass);
  }
}