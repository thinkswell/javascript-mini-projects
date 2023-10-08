
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

document.addEventListener("keydown", function(){
  if (!started) {
    document.querySelector("#level-title").innerHTML = "Level " + level;
    nextSequence();
    started = true;
  }
});


var noOfColors = document.querySelectorAll(".btn").length;
for(var i=0; i<noOfColors; i++){
    document.querySelectorAll(".btn")[i].addEventListener("click", function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
    })
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
    else {
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        document.querySelector("#level-title").innerHTML = "Game Over, Press Any Key to Restart";

        setTimeout(function () {
            document.querySelector("body").classList.remove("game-over");
        }, 200);

        startOver();
    }
}


function nextSequence(){
    userClickedPattern = [];
    level++;
    document.querySelector("#level-title").innerHTML = "Level " + level;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    var activeButton = document.querySelector("#" + randomChosenColour);   // to select say ("#red") id.

    activeButton.classList.add("pressed");

    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);

    //$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}


function animatePress(currentColour){
    var activeButton = document.querySelector("#" + currentColour);
    activeButton.classList.add("pressed");
    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
  

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}