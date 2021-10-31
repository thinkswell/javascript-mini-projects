const key = document.querySelectorAll(".keys");
const white_key = document.querySelectorAll(".white_key");
const black_key = document.querySelectorAll(".black_key");
let count = 0;
function play_note(note){
   console.log("Note:",note);
   let target = document.getElementsByClassName(note);
   target[0].currentTime=0;
   target[0].play();
   document.getElementById("keyNote").innerHTML = note;
}