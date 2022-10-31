const gameStats = {
  player: 'X',
  playerPoints: { X: 0, O: 0 },
  grid: [],
  turn: 0,
  changePlayer: function () {
    this.player = this.player === 'X' ? 'O' : 'X';
  }
};

function verificarVitoria() {
  const g = gameStats.grid;
  const equal = (a, b, c) => (g[a] == g[b] && g[b] == g[c]);
  if (equal(0, 1, 2)) return true;
  if (equal(3, 4, 5)) return true;
  if (equal(6, 7, 8)) return true;
  if (equal(0, 3, 6)) return true;
  if (equal(1, 4, 7)) return true;
  if (equal(2, 5, 8)) return true;
  if (equal(0, 4, 8)) return true;
  if (equal(2, 4, 6)) return true;
  return false;
}

function NodeSymbol() {
  this.element = document.createElement('div');
  this.element.classList.add('symbol');
  this.element.setAttribute('cor', '');

  this.setPlayerSymbol = s => {
    this.element.innerHTML = s;
    this.element.setAttribute('cor', s == 'X' ? 'red' : 'blue');
  };

  this.remove = () => this.element.remove();
}

function Squares() {

}

//GAME
const divSymbol = new NodeSymbol();

divSymbol.setPlayerSymbol(gameStats.player); //inicializar

const squares = document.querySelectorAll('[square]');
// console.log(squares)
squares.forEach((e, i) => {
  e.onmouseenter = () => {
    if (gameStats.grid[i]) divSymbol.remove();
    else e.appendChild(divSymbol.element);
  };
});

const grid = document.querySelector('.grid');
// console.log(grid)
grid.onmouseleave = () => {
  divSymbol.remove();
};

squares.forEach((e, i) => {
  e.onclick = () => {
    if (!gameStats.grid[i]) {
      gameStats.grid[i] = gameStats.player;
      gameStats.changePlayer();
      divSymbol.remove();
      let clone = divSymbol.element.cloneNode(true);
      e.appendChild(clone);
      divSymbol.setPlayerSymbol(gameStats.player);
      e.setAttribute('square', 'filled');
      if (++gameStats.turn > 4 && verificarVitoria()) {
        gameStats.playerPoints[gameStats.grid[i]]++;
        gameStats.changePlayer();
        alert(`${gameStats.player} wins`)
      }
    }
  };
});