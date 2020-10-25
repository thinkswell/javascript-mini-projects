// functions

// function that return a random number between min and max parameters
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// function that make the roulette spin, set the bg color and write the number in the HTML
function letSpin(min, max) {
  let number = randomNumber(min, max);
  $("#number").text(number);

  if (greenNumbers.includes(number)) {
    $(".wrapper").removeClass("red black green").addClass("green");

  } else if (redNumbers.includes(number)) {
    $(".wrapper").removeClass("red black green").addClass("red");

  } else if (blackNumbers.includes(number)) {
    $(".wrapper").removeClass("red black green").addClass("black");
  }
  
}

// script

// variable - min number in the roulette
var min = 0;
// variable - max number in the roulette
var max = 36;

// arrays of the red, black and green numbers
var redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
var blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
var greenNumbers = [0];

// call the function letSpin() when clicking the button 
$("#spin").click(function (){
  letSpin(min, max);
});
