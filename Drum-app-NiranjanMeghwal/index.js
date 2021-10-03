//detecting clicks
for(var i = 0;i < document.querySelectorAll(".icon").length;i++)
{
  document.querySelectorAll(".icon")[i].addEventListener("click",function () {
    var keyVal = this.innerHTML;
    playSound(keyVal);
    btnAnime(keyVal);
  });
}

//detecting keypresses
document.addEventListener("keypress",function(event){
  playSound(event.key);
  btnAnime(event.key);
});

//play sound accordingly
function playSound(keyVal)
{
  switch (keyVal) {
    case "cymbal":
              var audio = new Audio('sounds/crash.mp3');
              audio.play();
              break;

    case "snare":
              var audio = new Audio('sounds/snare.mp3');
              audio.play();
              break;

    case "high_tom":
              var audio = new Audio('sounds/tom-1.mp3');
              audio.play();
              break;

    case "medium_tom":
              var audio = new Audio('sounds/tom-2.mp3');
              audio.play();
              break;

    case "floor_tom":
              audio = new Audio('sounds/tom-3.mp3');
              audio.play();
              break;

    case "bass":
              audio = new Audio('sounds/kick-bass.mp3');
              audio.play();
              break;

    default:  console.log(keyVal);
  }
}

function btnAnime(btnVal) {
  var curBtn = document.querySelector("." + btnVal);
  curBtn.classList.add("pressed");

  setTimeout(function() {
    curBtn.classList.remove("pressed");
  },100);
}
