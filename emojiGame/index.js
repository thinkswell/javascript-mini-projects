const cards = document.querySelectorAll(".card");
// console.log(cards);
const score=document.querySelector(".points")
const message=document.querySelector(".msg")
const again=document.querySelector(".again")

 
var points= 0;
var msg;
var final=0;
//variables
var isFlipped = false;
var firstCard;
var secondCard;

cards.forEach((card) => card.addEventListener("click", flip));

function flip() {
  //   console.log("Card flipped");
  // console.log(this);
  this.classList.add("flip");
  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
  } else {
    secondCard = this;
    // console.log(firstCard);
    // console.log(secondCard);

    checkIt();
  }
}

function checkIt() {
  //   console.log("Checking...");
  if (firstCard.dataset.image === secondCard.dataset.image) {
    success();
  } else {
    fail();
  }
}

function success() {
  //   console.log("Success");
  firstCard.removeEventListener("click", flip);
  secondCard.removeEventListener("click", flip);
  reset();
  points+=15;
  score.innerText=points+"Points";
  msg="Good Going!! ";
  
  final+=1;
  if(final==8){
    msg="You Won!!"
  }
  message.innerText=msg;
}


function fail() {
  //   console.log("Failed");
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset();
    points-=5;
    msg= "better luck next time !!"
  score.innerText=points+" Points";
  message.innerText=msg;



  }, 700);
}

function reset() {
  isFlipped = false;
  firstCard = null;
  secondCard = null;
}

//TODO: shuffle

(function shuffle() {
  cards.forEach((card) => {
    var index = Math.floor(Math.random() * 16);
    card.style.order = index;
  });
})();

again.addEventListener("click",()=>{
  location.reload();
})