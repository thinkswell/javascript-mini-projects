const lbutton = document.querySelector("#lowerbutton");
const hbutton = document.querySelector("#higherbutton");

const numbergen = document.querySelector("#numbergen");
const graph = document.querySelector(".app-graph");
const hundred = document.querySelector("#dohundredbutton");

let hundredgen = false;
let bet = "";

function generateNumber() {
  let randomNumber = Math.trunc(Math.random() * 100);

  if (hundredgen) {
    let hundredrand = Math.random();
    if (hundredrand > 0.5) {
      bet = "higher";
    } else if (hundredrand < 0.5) {
      bet = "lower";
    } else {
      bet = "";
    }
  } else {
    numbergen.innerHTML = randomNumber.toString();
  }
  let newBox = document.createElement("div");
  newBox.style.width = "40px";
  newBox.style.height = "40px";
  newBox.style.margin = ".1rem";

  if (bet === "lower" && randomNumber < 50) {
    newBox.style.backgroundColor = "#AFE1AF";
  } else if (bet === "lower" && randomNumber > 50) {
    newBox.style.backgroundColor = "#880808";
  } else if (bet === "higher" && randomNumber > 50) {
    newBox.style.backgroundColor = "#AFE1AF";
  } else if (bet === "higher" && randomNumber < 50) {
    newBox.style.backgroundColor = "#880808";
  } else if (randomNumber === 50) {
    newBox.style.backgroundColor = "#333333";
  }
  graph.append(newBox);
}

function doHundredRandom() {
  graph.innerHTML = "";
  hundredgen = true;
  for (let i = 0; i < 100; i++) {
    generateNumber();
  }

  hundredgen = false;
}

lbutton.addEventListener("click", function () {
  bet = "lower";
  generateNumber();
});
hbutton.addEventListener("click", function () {
  bet = "higher";
  generateNumber();
});

hundred.addEventListener("click", function () {
  doHundredRandom();
});
