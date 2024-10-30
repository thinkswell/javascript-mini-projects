// Options
let sortingAlgorithm = quickSort; // bubbleSort, selectionSort, insertionSort, quickSort, mergeSort
let comparison = brightness; // brightness, red, green, blue
let imageSize = 250; // Make smaller for faster run time
let loops = 100; // # of times sorting algorithm runs before drawing (Higher number means larger changes)
let pixelDistance = 4; // Makes interesting visual effects (4 is correct value)

let url = 'https://ipfs.io/ipfs/bafybeihxzhlwsu5lkhzqu7sdlb5c43oinebfced5fdtk2zjgi3te2nbpb4/thunderstorm-3625405_1920.jpg';

// Global Variables
let imageLoaded = false;
let imgData;
let originalData;

let sortingCanvas;
let sortingCtx;

let imgHeight;
let imgWidth;
let keepSorting = true;
let sorted = false;
let animation;
let sSortIndex;
let stack;

let sortingAlgorithms = {
  'bubble': bubbleSort,
  'insertion': insertionSort,
  'selection': selectionSort,
  'merge': mergeSort,
  'quick': quickSort
}

document.addEventListener("DOMContentLoaded", () => {
  sortingCanvas = document.getElementById('sorting');
  sortingCtx = sortingCanvas.getContext('2d');
  function loadImage(url, callback) {
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext('2d');
      let h = Math.min(imageSize, this.height);
      let w = Math.round(this.width / this.height * h);

      canvas.height = h;
      canvas.width = w;
      sortingCanvas.height = h;
      sortingCanvas.width = w;
      ctx.drawImage(this, 0, 0, w, h);
      imgData = ctx.getImageData(0, 0, w, h);
      var dataURI = canvas.toDataURL('png');
      callback(dataURI, h, w, img);
    }
    img.src = url;
  }

  function afterLoad(URI, height, width, img) {
    if (!imageLoaded) {
      keepSorting = true;
      imageLoaded = true;
      img.src = URI;
      imgHeight = height;
      imgWidth = width;
      console.log('Image loaded');
      animation = window.requestAnimationFrame(draw);
    }
  }

  loadImage(url, afterLoad);

  document.getElementById('sorting-algorithm').addEventListener('change', (e) => {
    sSortIndex = undefined
    sortingAlgorithm = sortingAlgorithms[e.target.value];
    if (imageLoaded) {
      window.cancelAnimationFrame(animation)
      stack = undefined;
      imageLoaded = false;
      keepSorting = true;
      loadImage(url, afterLoad);
    }
  })
  document.getElementById('image').addEventListener('change', (e) => {
    window.cancelAnimationFrame(animation)
    sSortIndex = undefined;
    stack = undefined;
    imageLoaded = false;
    let image = e.target.files[0];
    url = window.URL.createObjectURL(image);
    document.getElementById('original-image').src = url;
    loadImage(url, afterLoad);
  })
})

function draw() {
  if (keepSorting) {
    sortHelper(sortingAlgorithm, imgData.data);
    sortingCtx.putImageData(imgData, 0, 0);
    window.requestAnimationFrame(draw);
  } else {
    console.log('Done sorting');
  }
}

function sortHelper(sorter, array) {
  switch (sorter.name) {
    case "quickSort":
      if (!stack) stack = quickSortHelper(array);
      sorter(array, stack);
      break;
    case "mergeSort":
      if (!stack) stack = mergeSortHelper(array);
      sorter(array, stack);
      break;
    default:
      sorter(array);
  }
}

function bubbleSort(array) {
  if (!sSortIndex) sSortIndex = array.length;
  keepSorting = false;
  for (let j = 0; j < loops; j++) {
    for (let i = 0; i < sSortIndex; i += pixelDistance) {
      if (comparison(array, i) > comparison(array, i + pixelDistance)) {
        swapPixel(array, i, i + pixelDistance);
        keepSorting = true;
      }
    }
    sSortIndex -= pixelDistance;
  }
  return array;
}

function selectionSort(array) {
  if (!sSortIndex) sSortIndex = array.length;
  for (let j = 0; j < loops; j++) {
    let max = -Infinity;
    let ind;
    for (let i = 0; i < sSortIndex; i += pixelDistance) {
      if (comparison(array, i) > max) {
        max = comparison(array, i);
        ind = i;
      }
    }
    swapPixel(array, ind, sSortIndex);
    sSortIndex -= pixelDistance;
  }
  if (sSortIndex <= 3) keepSorting = false;
}

function insertionSort(array) {
  if (!sSortIndex) sSortIndex = pixelDistance;
  let currentIndex;
  let newArray = array;
  for (let i = 0; i < loops; i++) {
    if (comparison(newArray, sSortIndex) < comparison(newArray, sSortIndex - pixelDistance)) {
      currentIndex = sSortIndex - pixelDistance;
      while (comparison(newArray, sSortIndex) < comparison(newArray, currentIndex)) {
        if (currentIndex < 0) break;
        currentIndex -= pixelDistance;
      }
      newArray = movePixel(newArray, sSortIndex, currentIndex + pixelDistance);
    }
    sSortIndex += pixelDistance;
  }
  newArray.forEach((e, i) => array[i] = e)
  return array;
}

function quickSortHelper(array, qStack) {
  if (!qStack) {
    var qStack = [];
    let splitPoint = split(array, 0, array.length - pixelDistance);

    qStack.push({
      split: splitPoint,
      begin: 0,
      end: splitPoint - pixelDistance
    })
    qStack.push({
      split: splitPoint,
      begin: splitPoint + pixelDistance,
      end: array.length - pixelDistance
    })
  }
  return qStack;
}

function quickSort(array, qStack) {
  for (let i = qStack.length - 1; i >= 0; i--) {
    let q = qStack[i];
    if (q.begin < q.end && q.begin !== q.split && q.end !== q.split) {
      let splitPoint = split(array, q.begin, q.end);
      if (q.begin < splitPoint - pixelDistance)
        qStack.push({
          split: splitPoint,
          begin: q.begin,
          end: splitPoint - pixelDistance
        })
      if (q.begin + pixelDistance < q.end)
        qStack.push({
          split: splitPoint,
          begin: splitPoint + pixelDistance,
          end: q.end
        })
    }
    qStack.splice(i, 1);
  }
  if (!qStack.length && sorted) keepSorting = false;
  if (!qStack.length && !sorted) {
    sorted = true;
    stack = undefined;
  }
  return qStack;
}

function mergeSortHelper(array, s = 0, e = array.length - pixelDistance, mStack = []) {
  if (s < e) {
    let mid = floorToFour((e + s) / 2);
    mergeSortHelper(array, s, mid, mStack);
    mergeSortHelper(array, mid + pixelDistance, e, mStack);
    mStack.unshift({
      start: s,
      mid: mid,
      end: e
    })
  }
  return mStack;
}

function mergeSort(array, mStack) {
  let i = Math.min(loops, mStack.length);
  while (i--) {
    let m = mStack[mStack.length - 1];
    merge(array, m.start, m.mid, m.end);
    mStack.length--;
  }
  if (mStack.length === 0) keepSorting = false;
}

function merge(array, s, mid, e) {
  let left = s,
    right = mid + pixelDistance,
    merged = [];
  while (left <= mid && right <= e) {
    if (comparison(array, left) < comparison(array, right)) {
      merged.push(...getPixels(array, left));
      left += pixelDistance;
    } else {
      merged.push(...getPixels(array, right));
      right += pixelDistance;
    }
  }
  while (left <= mid) {
    merged.push(...getPixels(array, left));
    left += pixelDistance;
  }
  while (right <= e) {
    merged.push(...getPixels(array, right));
    right += pixelDistance;
  }
  combine(array, merged, s);
  return array;
}

// Helper Functions

function combine(array, copy, s) {
  for (let i = 0; i < copy.length; i++) {
    array[i + s] = copy[i];
  }
  return array;
}

function split(array, start, end) {
  let done = false,
    left = start + pixelDistance,
    right = end,
    pivot = comparison(array, start);

  while (!done) {
    while (left <= right && comparison(array, left) <= pivot) left += pixelDistance;
    while (comparison(array, right) >= pivot && right >= left) right -= pixelDistance;
    if (left >= right) done = true;
    else swapPixel(array, left, right);
  }
  swapPixel(array, start, right);
  return right;
}

function swapPixel(array, i1, i2) {
  for (let i = 0; i < 3; i++) {
    let t = array[i1 + i];
    array[i1 + i] = array[i2 + i];
    array[i2 + i] = t;
  }
  return array;
}

function movePixel(array, initial, end) {
  let toMove = array.slice(initial, initial + pixelDistance);
  let newArray;
  if (initial > end) {
    newArray = [...array.slice(0, end), ...toMove, ...array.slice(end, initial), ...array.slice(initial + pixelDistance)];
  } else {
    newArray = [...array.slice(0, initial), ...array.slice(initial + pixelDistance, end + pixelDistance), ...toMove, ...array.slice(end + pixelDistance)];
  }
  return newArray;
}

function getPixels(array, i) {
  return [array[i], array[i + 1], array[i + 2], array[i + 3]]
}

function floorToFour(num) {
  return Math.floor(num / 4) * 4;
}

// Comparison functions

function brightness(array, index) {
  return array[index] + array[index + 1] + array[index + 2];
}

function red(array, index) { return array[index]; }
function green(array, index) { return array[index + 1]; }
function blue(array, index) { return array[index + 2]; } 