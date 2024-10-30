var nought1 = 0;
var nought2 = 0;
var nought3 = 0;
var nought4 = 0;
var nought5 = 0;
var nought6 = 0;
var nought7 = 0;
var nought8 = 0;

function changeLeverOne() {
  if (nought1 == 0) {
    document.getElementById('firstLever').src = 'assets/img/lever_down.png';
    nought1 = 1;
  }
  else {
    document.getElementById("firstLever").src = 'assets/img/lever_up.png';
    nought1 = 0;
  }
  workOut()
}
function changeLeverTwo() {
  if (nought2 == 0) {
    document.getElementById('secondLever').src = 'assets/img/lever_down.png';
    nought2 = 1;
  }
  else {
    document.getElementById("secondLever").src = 'assets/img/lever_up.png';
    nought2 = 0;
  }
  workOut()
}
function changeLeverThree() {
  if (nought3 == 0) {
    document.getElementById('thirdLever').src = 'assets/img/lever_down.png';
    nought3 = 1;
  }
  else {
    document.getElementById("thirdLever").src = 'assets/img/lever_up.png';
    nought3 = 0;
  }
  workOut()
}
function changeLeverFour() {
  if (nought4 == 0) {
    document.getElementById('fourthLever').src = 'assets/img/lever_down.png';
    nought4 = 1;
  }
  else {
    document.getElementById("fourthLever").src = 'assets/img/lever_up.png';
    nought4 = 0;
  }
  workOut()
}
function changeLeverFive() {
  if (nought5 == 0) {
    document.getElementById('fifthLever').src = 'assets/img/lever_down.png';
    nought5 = 1;
  }
  else {
    document.getElementById("fifthLever").src = 'assets/img/lever_up.png';
    nought5 = 0;
  }
  workOut()
}
function changeLeverSix() {
  if (nought6 == 0) {
    document.getElementById('sixthLever').src = 'assets/img/lever_down.png';
    nought6 = 1;
  }
  else {
    document.getElementById("sixthLever").src = 'assets/img/lever_up.png';
    nought6 = 0;
  }
  workOut()
}
function changeLeverSeven() {
  if (nought7 == 0) {
    document.getElementById('seventhLever').src = 'assets/img/lever_down.png';
    nought7 = 1;
  }
  else {
    document.getElementById("seventhLever").src = 'assets/img/lever_up.png';
    nought7 = 0;
  }
  workOut()
}
function changeLeverEight() {
  if (nought8 == 0) {
    document.getElementById('eighthLever').src = 'assets/img/lever_down.png';
    nought8 = 1;
  }
  else {
    document.getElementById("eighthLever").src = 'assets/img/lever_up.png';
    nought8 = 0;
  }
  workOut()
}
function workOut() {
  document.getElementById('binary').innerHTML = nought1.toString()+nought2.toString()+nought3.toString()+nought4.toString();
  document.getElementById('binary2').innerHTML = nought5.toString()+nought6.toString()+nought7.toString()+nought8.toString();
  document.getElementById('hexidecimal').innerHTML = ((nought1*8+nought2*4+nought3*2+nought4*1).toString(16)).toUpperCase();
  document.getElementById('hexidecimal2').innerHTML = ((nought5*8+nought6*4+nought7*2+nought8*1).toString(16)).toUpperCase();
  document.getElementById('decimal').innerHTML = (nought1*128+nought2*64+nought3*32+nought4*16+nought5*8+nought6*4+nought7*2+nought8*1).toString()
  // Add octal at one point???
}
