var loopCount = document.querySelectorAll(".drum").length; // getting length of array of buttons with class .drum
/* looping though each button
If button got press then this function. */
for (var i = 0; i < loopCount; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var btnInnerHTML = this.innerHTML;
        playSound(btnInnerHTML);
        animation(btnInnerHTML);
    });
}
// Event listner for keyboard press. 
document.addEventListener("keypress", function (event) {
    // when ever a key is pressed we get all the info about it. (here we only want the 'key' which is pressed.)
    playSound(event.key); // sends (event.key) value to playSound() and animaton() function.
    animation(event.key);
})

function playSound(key) {
    switch (key) {
        case "f":
            var tom1 = new Audio('sounds/tom-1.mp3');
            tom1.play();
            break;
        case "a":
            var tom2 = new Audio('sounds/tom-2.mp3');
            tom2.play();
            break;
        case "s":
            var tom3 = new Audio('sounds/tom-3.mp3');
            tom3.play();
            break;
        case "d":
            var tom4 = new Audio('sounds/tom-4.mp3');
            tom4.play();
            break;
        case "l":
            var snare = new Audio('sounds/snare.mp3');
            snare.play();
            break;
        case "j":
            var kick = new Audio('sounds/kick-bass.mp3');
            kick.play();
            break;
        case "k":
            var crash = new Audio('sounds/crash.mp3');
            crash.play();
            break;
        default:
            console.log(key);
            break;
    }
}
// function for animation of the keys
function animation(getKey) {
    var activeBtn = document.querySelector("." + getKey);
    activeBtn.classList.add("pressed");
    setTimeout(function () {
        activeBtn.classList.remove("pressed");
    }, 200); // will wait for 200 miliseconds
}