// Conway's Game of life
// RULES:
// 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// 2. Any live cell with two or three live neighbours lives on to the next generation.
// 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

let WIDTH;
let HEIGHT;
let COLS;
let ROWS;
const SIZE = 10;
const SPACE_KEY_CODE = 32;
const ENTER_KEY_CODE = 13;

var grid = []; // 2D array

function Cell(i, j) {
  // each Cell contains a number of living neighbors and its state (alive or dead)
  this.i = i;
  this.j = j;
  this.isDead = random(1) < 0.5 ? true : false;
  this.neighbors;
  this.show = function () {
    noStroke();
    if (this.isDead) color = 0;
    else color = [0, 153, 51];
    fill(color);
    rect(this.i * SIZE, this.j * SIZE, SIZE);
  };

  this.getNeighbors = function (grid) {
    // count living neighbors
    this.neighbors = 0;
    const pos = [-1, 0, 1];
    for (var x of pos) {
      for (var y of pos) {
        if (x != 0 || y != 0) {
          var i = (this.i + x + COLS) % COLS;
          var j = (this.j + y + ROWS) % ROWS;
          if (!grid[i][j].isDead) this.neighbors++;
        }
      }
    }
  };

  this.update = function (grid) {
    // follow the rules
    var i = this.i;
    var j = this.j;
    if (this.isDead) {
      // if it's dead and there are 3 living neighbors
      if (grid[i][j].neighbors == 3) {
        this.isDead = false; // revive it
      }
    } else {
      if (grid[i][j].neighbors < 2 || grid[i][j].neighbors > 3) {
        // if it's alive and there are less than 2 or
        this.isDead = true; // greater than 3 living neighbors => kill it
      }
    }
  };

  this.clicked = function () {
    // click on the cell with revive it
    var centerX = this.i * SIZE + SIZE / 2;
    var centerY = this.j * SIZE + SIZE / 2;

    var d = dist(mouseX, mouseY, centerX, centerY);
    if (d <= SIZE / 2) {
      this.isDead = false;
    }
  };
}

function windowResized() {
  // resize canvas
  resizeCanvas(windowWidth, windowHeight);
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  COLS = Math.floor(WIDTH / SIZE);
  ROWS = Math.floor(HEIGHT / SIZE);
  grid = randomGrid();
}

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  createCanvas(WIDTH, HEIGHT);
  COLS = Math.floor(WIDTH / SIZE);
  ROWS = Math.floor(HEIGHT / SIZE);
  grid = randomGrid();
}

function mousePressed() {
  // get mouse press
  loop();
  for (var i = 0; i < COLS; i++) {
    for (var j = 0; j < ROWS; j++) {
      grid[i][j].clicked();
    }
  }
}

function draw() {
  background(0);

  for (var i = 0; i < COLS; i++) {
    for (var j = 0; j < ROWS; j++) {
      grid[i][j].getNeighbors(grid); // count all the living neighbors
    }
  }

  for (var i = 0; i < COLS; i++) {
    for (var j = 0; j < ROWS; j++) {
      grid[i][j].show(color); // show
    }
  }

  var oldGrid = copyGrid(grid); // copy the grid for the update

  for (var i = 0; i < COLS; i++) {
    for (var j = 0; j < ROWS; j++) {
      grid[i][j].update(oldGrid); // update the cell
    }
  }
}

function copyGrid(grid) {
  var currentGrid = new Array(COLS);
  for (var i = 0; i < COLS; i++) {
    currentGrid[i] = new Array(ROWS);
  }
  for (var i = 0; i < COLS; i++) {
    for (var j = 0; j < ROWS; j++) {
      currentGrid[i][j] = Object.assign({}, grid[i][j]);
    }
  }
  return currentGrid;
}

function randomGrid() {
  // initialize a random grid
  var grid = new Array(COLS);
  for (let i = 0; i < COLS; i++) {
    grid[i] = new Array(ROWS);
  }

  for (var i = 0; i < COLS; i++) {
    for (var j = 0; j < ROWS; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
  return grid;
}

// press SPACE to stop/continue the loop and ENTER to replay
function keyPressed() {
  if (keyCode === SPACE_KEY_CODE) {
    if (isLooping()) {
      noLoop();
    } else {
      loop();
    }
  }

  if (keyCode === ENTER_KEY_CODE) {
    window.location.reload();
  }

  return false;
}
