// Card data
const cardsArray = [
  {
    name: "pokemon1",
    img: "./assets/media/pokemon1.png",
  },
  {
    name: "pokemon2",
    img: "./assets/media/pokemon2.png",
  },
  {
    name: "pokemon3",
    img: "./assets/media/pokemon3.png",
  },
  {
    name: "pokemon4",
    img: "./assets/media/pokemon4.png",
  },
  {
    name: "pokemon5",
    img: "./assets/media/pokemon5.png",
  },
  {
    name: "pokemon6",
    img: "./assets/media/pokemon6.png",
  },
  {
    name: "pokemon7",
    img: "./assets/media/pokemon7.png",
  },
  {
    name: "pokemon8",
    img: "./assets/media/pokemon8.png",
  },
  {
    name: "pokemon9",
    img: "./assets/media/pokemon9.png",
  },
  {
    name: "pokemon10",
    img: "./assets/media/pokemon10.png",
  },
  {
    name: "pokemon11",
    img: "./assets/media/pokemon11.png",
  },
  {
    name: "pokemon12",
    img: "./assets/media/pokemon12.png",
  },
];
// GAME 
const game = document.getElementById("game");

const grid = document.createElement("section");
grid.classList.add("grid");
// game.addEventListener("click", secCount);
game.appendChild(grid);
// DOUBLE ARREY

let gameGrid = cardsArray.concat(cardsArray);

// FOR RAMDOMISING THE CARDS EVERY TIME WE REFERESH THE PAGE

gameGrid.sort(() => 0.5 - Math.random());

// CREATE CARDS

gameGrid.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add(`card`,`${item.name}`);
  card.dataset.name = item.name;
  const front = document.createElement("div");
  front.classList.add("front");
  const back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = `url(${item.img})`;
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});


// ATTEMPTS COUNT
let attemptCount = 0;
let attempts = document.querySelector(".count");
attempts.innerText = attemptCount;

// TIME COUNT
var sec = 0;
var timeInSec;
let min = 0;

function secCount() {
  sec = sec + 1;
  document.querySelector(".sec-count").innerText = Math.floor(sec % 60);
  timeInSec = setTimeout(secCount, 1000);
  min = Math.floor(sec / 60);
  document.querySelector(".min-count").innerText = min;
}
var timeStarted = false;
// secCount();

// RESET ALL
let reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
  let confirmReset = confirm("Whole game will start again. continue to reset?");
  if (confirmReset === true) {
    window.location.reload();
  } 
});
//  VARIABLES FOR THE GAME
let firstGuess = "";
let secondGuess = "";
let previousTarget = null;
let count = 0;
let delay = 1200;

// FUNCTIONS FOR THE GAME

const match = () => {
  var selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.add("match");
  });
};

const resetGuesses = () => {
  firstGuess = "";
  secondGuess = "";
  count = 0;
  var selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.remove("selected");
  });
};


// GAME LOGICS

grid.addEventListener("click", function (event) {
  !timeStarted && secCount();
  timeStarted = true;
  let clicked = event.target;  
  attemptCount++;
  attempts.innerText = attemptCount;
  if (
    clicked.nodeName === "SECTION" ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains("selected")
  ) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      // Assign first guess
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      // Assign second guess
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }
    // If both guesses are not empty...
    if (firstGuess !== "" && secondGuess !== "") {
      // and the first guess matches the second match...
      if (firstGuess === secondGuess) {
        // run the match function
        // match();
        // resetGuesses();
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
        var matched = document.querySelectorAll(`.${firstGuess}`);
        matched.forEach(node => node.addEventListener('click',function (e) {   
          e.stopPropagation();
        }))
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
  }
  // Set previous target to clicked
  previousTarget = clicked;
});

