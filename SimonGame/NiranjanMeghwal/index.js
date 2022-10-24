var btnclr = ["green","red","blue","yellow"];

var pattern = [];
var userPtrn = [];

var level = 0;
var started = false;

$(document).keypress(function () {
    if(!started)
    {
      $("#level-title").text("Level " + level);
      newSeq();
      started = true;
    }
});

$(".btn").click(function(){
  if(started)
  {
    userPtrn.push($(this).attr('id'));
    animatePress($(this).attr('id'));
    playSound($(this).attr('id'));
    console.log(userPtrn);
  }
});


function newSeq() {
  userPtrn = [];

  level++;
  $("#level-title").text("Level " + level);

  var random = Math.floor(Math.random()*4);
  var randomClr = btnclr[random];

  pattern.push(randomClr);
  $("#" + randomClr).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomClr);
}

function playSound(name)
{
  var aud = new Audio('sounds/' + name + '.mp3');
  aud.play();
}

function animatePress(currentClr){
  $('#' + currentClr).addClass('pressed');

  setTimeout(function() {
  $('#' + currentClr).removeClass('pressed');
  },100);
  checkAnswer(userPtrn.length - 1);
}

function checkAnswer(level) {
  if(pattern[level] === userPtrn[level])
  {
    console.log("success");
    if(pattern.length === userPtrn.length)
    {
      setTimeout(function(){
        newSeq();
      },1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    $("#level-title").html("GAME-OVER !!"+"<br/>"+"( Press Any Key to Restart )");
    startOver();
  }
}

function startOver() {
  level = 0;
  pattern = [];
  started = false;
}
