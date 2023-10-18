
function clearCanvas() {
  ctx.beginPath();
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
}

function resetArray() {
  array = [];
}

async function sleep() {
  return new Promise((temp) => {
    setTimeout(() => temp(2), SPEED); // timeout this function for duration SPEED
  });
}

function swap(i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

/**
 *
 * @param {index in array to draw} index
 * @param {The value of the index in array} value
 * @param {The new color to draw the index} color
 */
function drawBar(index, value, color = DEFAULT_COLOR) {
  ctx.beginPath();
  // clear the previous bar
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(
    Math.ceil((WIDTH / ARR_SIZE) * index),
    0,
    Math.floor(WIDTH / ARR_SIZE),
    HEIGHT
  );

  ctx.fillStyle = color;
  ctx.fillRect(
    Math.ceil((WIDTH / ARR_SIZE) * index),
    HEIGHT,
    Math.floor(WIDTH / ARR_SIZE),
    Math.floor(-HEIGHT * (value / MAX_ARR_VAL))
  );

  ctx.closePath();
}

function drawArray() {
  clearCanvas();

  for (let i = 0; i < array.length; i++) {
    let val = array[i];
    drawBar(i, val, DEFAULT_COLOR);
  }
}

function randomizeArray() {
  if (running) {
    running = false;
  }
  clearCanvas();
  resetArray();

  for (let i = 0; i < ARR_SIZE; i++) {
    array.push(Math.floor(Math.random() * MAX_ARR_VAL));
  }

  drawArray();
}

function runSort() {

  if (!running) {
    running = true;

    let sortingAlgorithm;
    const algoName = sortingAlgo.value;
    switch (algoName) {
      case "bubble":
        sortingAlgorithm = bubbleSort;
        break;
      case "selection":
        sortingAlgorithm = selectionSort;
        break;
      case "insertion":
        sortingAlgorithm = insertionSort;
        break;
      case "merge":
        sortingAlgorithm = mergeSort;
        break;
      case "quick": // TODO
        sortingAlgorithm = quickSort;
        break;
      case "heap":
        sortingAlgorithm = heapSort;
        break;
      default:
        console.log("Invalid input");
    }

    sortingAlgorithm(array).then((sorted) => {
      if (running) {
        array = sorted;
        drawArray();
        running = false;
      }
    });

  } else {
    console.log("Cannot restart: sorting is actively running!");
  }
}

function speedInput() {
  SPEED = speedSlider.value;
  speedOutput.innerHTML = SPEED;
}
function sizeInput() {
  ARR_SIZE = sizeSlider.value;
  sizeOutput.innerHTML = ARR_SIZE;
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const WIDTH = canvas.width,
  HEIGHT = canvas.height;

// button, slider setup
randomizeBtn = document.getElementById("randomizeBtn");
sortingBtn = document.getElementById("sortButton");

// array size
var sizeSlider = document.getElementById("sizeSlider");
var sizeOutput = document.getElementById("sizeValue");
var ARR_SIZE;
// getting latency
var speedSlider = document.getElementById("speedSlider");
var speedOutput = document.getElementById("speedValue"); // get the output from the slider span
var SPEED;
// getting sorting algorithm
var sortingAlgo = document.getElementById("sortingFunction");

// everytime we mess with slider, it updates values inside
speedSlider.oninput = speedInput;
sizeSlider.oninput = () => {
  sizeInput();

  randomizeArray();
};


// initializing stuff I use everywhere
let array = [];
const MAX_ARR_VAL = 100;
let running = false;

// COLORS
const DEFAULT_COLOR = "black";
const BACKGROUND_COLOR = "white";

// first call
speedInput();
sizeInput();
randomizeArray(); // randomize and draw the array
