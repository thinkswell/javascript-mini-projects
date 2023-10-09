
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


$(".btn").on("click", function(){                 // saari document ki buttons k kisi pe bhi dabaaane pr function run ho jaa raha jisme apan har click hone waale <button> ka attribute "id" store kara rahe variable me aur usse phir bhej rahe array me 
    var userChosenColour = $(this).attr("id");    // this se pura " <div type="button" id="green" class="btn green">" select ho jaata hain phir bas ab apan ko isme attribute "id" ka pata krna hain ki kis color ka button click kiya gaya tha
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentlevel)
{
    if(gamePattern[currentlevel] == userClickedPattern[currentlevel])
    {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length)             //checking if one complete round of game is completed or not
        {
            setTimeout(function(){
                nextSequence();} , 1000);
            }

        }
        else{
            var audio = new Audio("sounds/wrong.mp3");
             audio.play();

             $("body").addClass("game-over");
             setTimeout(function(){document.querySelector("body").classList.remove("game-over")}, 200);
             $("h1").html("<span style='color: red;'>Gameover.</span></br></br> Press any key to Restart.");

             startOver();
            }
 }
            




function nextSequence(){

    userClickedPattern = [];
    ++level;
    $("h1").text("Level - " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosenColour);
}

function playsound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){document.querySelector("#" + currentColour).classList.remove("pressed")}, 100);
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}