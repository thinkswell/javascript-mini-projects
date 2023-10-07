// detecting button press

for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {
      var buttonInnerHTML = this.innerHTML;
      makeSound(buttonInnerHTML);

      buttonAnimation(buttonInnerHTML);
    });
  }

  // detecting keyboard press
  document.addEventListener("keypress",function(event){
    makeSound(event.key);


    buttonAnimation(event.key);
  });
  function makeSound(key){
    switch (key) {
      case "w":
        var crash = new Audio("/home/manu/Desktop/Drum Kit Starting Files/sounds/crash.mp3");
        crash.play();
        break;
      case "a":
        var kick = new Audio("/home/manu/Desktop/Drum Kit Starting Files/sounds/kick-bass.mp3");
        kick.play();
        break;
      case "s":
        var snare = new Audio("/home/manu/Desktop/Drum Kit Starting Files/sounds/snare.mp3");
        snare.play();
        break;
      case "d":
        var tom1 = new Audio("/home/manu/Desktop/Drum Kit Starting Files/sounds/tom-1.mp3");
        tom1.play();
        break;
      case "j":
        var tom2 = new Audio("/home/manu/Desktop/Drum Kit Starting Files/sounds/tom-2.mp3");
        tom2.play();
        break;
      case "k":
        var tom3 = new Audio("/home/manu/Desktop/Drum Kit Starting Files/sounds/tom-3.mp3");
        tom3.play();
        break;
      case "l":
        var tom4 = new Audio("/home/manu/Desktop/Drum Kit Starting Files/sounds/tom-4.mp3");
        tom4.play();
      default:
        console.log(buttonInnerHTML);
    }
  }

function buttonAnimation(currentKey){
  var activeButton=document.querySelector("."+currentKey);//.w,.a,.s and so on.
  activeButton.classList.add("pressed");
  setTimeout(function(){activeButton.classList.remove("pressed")},100);
}
