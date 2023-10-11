
// for shadow effect

var pressbuttons = document.querySelectorAll(".drum");
var pressbuttonsArray = Array.from(pressbuttons);

function activeButton() {
  pressbuttonsArray.forEach(function (button) {
    button.addEventListener('click', function () {
      shadowAnim(button);
    });
  });
}




//for sound when click

function audioWhenClick(){
           
    pressbuttonsArray.forEach(function(button){
       button.addEventListener('click',function(){
             
                 clickPlayAudio(button.innerHTML) ;
       });

    });
}

// for sound when keyword is pressed

document.addEventListener('keydown', function(event) {
  clickPlayAudio(event.key);
  keyPressShadow(event.key); // Pass the key as a parameter
});

function keyPressShadow(key) {
  var element = document.querySelector("." + key);
  if (element) {
      element.classList.add("pressed");
      setTimeout(function() {
          element.classList.remove("pressed");
      }, 100);
  }
}



function shadowAnim(button) {
    button.classList.add("pressed");
    setTimeout(() => {
      button.classList.remove("pressed");
    }, 100);
  }

function clickPlayAudio(buttonValue){

         switch (buttonValue) {
            case 'w':
           
                var tom1=new Audio("./sounds/tom-1.mp3")
                tom1.play();
                break;
            case 'a':
             var kickbass=new Audio("./sounds/kick-bass.mp3");
             kickbass.play();
             break;
             case's':
             var audios=new Audio ("./sounds/tom-2.mp3");
             audios.play();
             break;
             case 'd':
                var audiod=new Audio("./sounds/snare.mp3")
                audiod.play();
                break;
                case 'j':
                var audioj=new Audio("./sounds/tom-3.mp3")
                audioj.play();
                break;
                case 'k':
                var audiok=new Audio("./sounds/crash.mp3")
                    audiok.play();
                    break;
                case 'l':
                var audiol=new Audio("./sounds/tom-4.mp3")
                audiol.play();
                break;
            default:
                break;
         }   

}




    


activeButton();
audioWhenClick();

