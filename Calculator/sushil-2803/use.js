"use strict";

var input = document.getElementById('input'), // input/output button
  number = document.querySelectorAll('.n'), // number buttons
  operator = document.querySelectorAll('.o'), // operator buttons
  result = document.getElementById('result'), // equal button
  clear = document.getElementById('clear'), // clear button
  resultDisplayed = false; // flag to keep an eye on what output is displayed

// adding click handlers to number buttons

function number_handler(event) {
  // storing current input string and its last character in variables - used later
  var currentString = input.innerHTML;
  var lastChar = currentString[currentString.length - 1];

  // if result is not diplayed, just keep adding
  if (resultDisplayed === false) {
    input.innerHTML += event.target.innerHTML;
  } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
    // if result is currently displayed and user pressed an operator
    // we need to keep on adding to the string for next operation
    resultDisplayed = false;
    input.innerHTML += event.target.innerHTML;
  } else {
    // if result is currently displayed and user pressed a number
    // we need clear the input string and add the new input to start the new opration
    resultDisplayed = false;
    input.innerHTML = "";
    input.innerHTML += event.target.innerHTML;
  }

}
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click",number_handler );
}

// adding click handlers to number buttons
function operator_handler(event) {
  // storing current input string and its last character in variables - used later
  var currentString = input.innerHTML;
  var lastChar = currentString[currentString.length - 1];

  // if last character entered is an operator, replace it with the currently pressed one
  if (lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "÷") {
    var newString = currentString.substring(0, currentString.length - 1) + event.target.innerHTML;
    input.innerHTML = newString;
  } else if (currentString.length == 0) {
    // if first key pressed is an opearator, don't do anything
    console.log("enter a number first");
  } else {
    // else just add the operator pressed to the input
    input.innerHTML += event.target.innerHTML;
  }

}
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click",operator_handler );
}

// adding a window eventListener to add keypress events to window
function windows_handler(event){
  if (parseInt(event.key)<=9 || parseInt(event.key)>=0) {
    // storing current input string and its last character in variables - used later
  var currentString = input.innerHTML;
  var lastChar = currentString[currentString.length - 1];

  // if result is not diplayed, just keep adding
  if (resultDisplayed === false) {
    input.innerHTML += parseInt(event.key);
  } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
    // if result is currently displayed and user pressed an operator
    // we need to keep on adding to the string for next operation
    resultDisplayed = false;
    input.innerHTML += parseInt(event.key);
  } else {
    // if result is currently displayed and user pressed a number
    // we need clear the input string and add the new input to start the new opration
    resultDisplayed = false;
    input.innerHTML = "";
    input.innerHTML += parseInt(event.key);
  }
  }
  else if(event.key === "+" || event.key === "-" || event.key === "x" || event.key === "÷" || event.key === "/"  ||  event.key === "*" ){
     // storing current input string and its last character in variables - used later
  var currentString = input.innerHTML;
  var lastChar = currentString[currentString.length - 1];
  var s=event.key;
  if(s=="/"){      // deckared a variable s to accomodte / as ÷
    s="÷"
  }
  if(s=="*"){    // to accomodate * as ×
    s=document.querySelector('.multiply_sign').textContent;        // to apply sign x when * is pressed
  }
  // if last character entered is an operator, replace it with the currently pressed one
  if (lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "÷") {
    var newString = currentString.substring(0, currentString.length - 1) + s;
    input.innerHTML = newString;
  } else if (currentString.length == 0) {
    // if first key pressed is an opearator, don't do anything
    console.log("enter a number first");
  } else {
    // else just add the operator pressed to the input
    input.innerHTML +=  s;
  }
  }
}
window.addEventListener("keypress",windows_handler);


// on click of 'equal' button

function output(){

  // this is the string that we will be processing eg. -10+26+33-56*34/23
  var inputString = input.innerHTML;

  // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
  // first we replace all the numbers and dot with empty string and then split
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // now we are looping through the array and doing one operation at a time.
  // first divide, then multiply, then subtraction and then addition
  // as we move we are alterning the original numbers and operators array
  // the final element remaining in the array will be the output

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // displaying the output

  resultDisplayed = true; // turning flag if result is displayed
}
result.addEventListener("click",output );


// clearing the input on press of clear
clear.addEventListener("click", function() {
  input.innerHTML = "";
})

//adding a event for clearing with the help of backspace 
window.onkeydown = function(event){
  let key = event.key;
  if (key === "Backspace") {
    input.innerHTML = "";
  }
  else if(key==="Enter"){
    output()
  }
}
