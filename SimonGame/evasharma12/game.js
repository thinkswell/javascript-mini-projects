var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var count = 0;

var started = false;

//Start game by a keypress
$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+ count);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(event) {

    var userChosenColour = $(event.target).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
  });
  



function checkAnswer(index){
    if(gamePattern[index] === userClickedPattern[index]){
        if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000)
    }
    }
    //If the answer is wrong
    else{
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game over, press any key to restart");
        
        startOver();
    }
}



function nextSequence(){
    $("#level-title").text("Level "+ count);
    count++;
    userClickedPattern = [];
    //A random number is chosen
    var randomNumber = Math.floor(Math.random() * 4);       
    var randomChosenColour = buttonColours[randomNumber];
    //Game pattern is stored in an array
    gamePattern.push(randomChosenColour);

    //Animation for the random colour
    $("#" + randomChosenColour).fadeIn(500).fadeOut(500).fadeIn(500);
    playSound(randomChosenColour);
}

function startOver(){
    count = 0;
    gamePattern = [];
    
    started = false;
}

//Play sound on click
function playSound(name){
    var audio = new Audio('sounds/' + name + '.wav');
    audio.play();
}

//Button Animation
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed"); 
    }, 100)
}