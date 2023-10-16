/*//<-----------***By using queryselector change html values ----------------->
document.querySelector('.message').textContent = 'Number socho';  // we can rewrite any html element by using this method we need only html page for id or class selector

console.log(document.querySelector('.message').textContent = 'Number socho');  // we can rewrite any html element by using this method we need only html page for id or class selector

document.querySelector('.score').textContent = 10;  // this is the only need but showing the output on console use console,log
console.log( document.querySelector('.score').textContent = 10);   // we can rewrite any html element by using this method we need only html page for id or class selector

document.querySelector('.guess').value = 23;  //for change actual value use .value 
console.log(document.querySelector('.guess').value = 23);*/

// now we wanna secret no.
//Math random() for random secret value
// under 0 to 20 value write Math.random()*20
// without point value write Math.trunc(Math.random()*20)
let secret = Math.trunc(Math.random() * 20);

let life = 6;
let highscore = 0;


document.querySelector(".check").addEventListener("click", function () {
  let guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess); //if we want anything from user they give us in the form of 'string' thats why use Number

  // in console 45 if i click on check btn
  //console.log(document.querySelector('.message').textContent = 'You win the game');

  //when there is no input
  if (!guess) {
    document.querySelector(".message").textContent = "Please type your number"; // now we wanna secret no.
  }
  // when your number is correct
  else if (guess === secret) {
    document.querySelector(".message").textContent = "🎉🎊 Congrats! your no. is correct😎😎";
    document.querySelector("body").style.backgroundColor = "green";
    document.querySelector(".number").textContent = secret;

    if (life > highscore) {
      highscore = life;
      document.querySelector(".highscore").textContent = highscore;
    }
  }
  // when your number is too big
  else if (guess > secret) {
    if (life > 1) {
      document.querySelector(".message").textContent = "Your no is too big";
      life--;
      document.querySelector(".life").textContent = life;
      
    } else {
      document.querySelector(".message").textContent =
        "You lost the game 😕😕😕 Try Again!";
      document.querySelector(".life").textContent = 0;
      document.querySelector("body").style.backgroundColor = "#D82148";
    }
  }
  // when your number is too low
  else if (guess < secret) {
    if (life > 1) {
      document.querySelector(".message").textContent = "Your no is too low";
      life--;
      document.querySelector(".life").textContent = life;
     
    } else {
      document.querySelector(".message").textContent =
        "You lost a game 😕😕😕 Try Again!";
      document.querySelector(".life").textContent = 0;
      document.querySelector("body").style.backgroundColor = "#D82148";
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  life = 6;
  
  secret = Math.trunc(Math.random() * 20);
  document.querySelector(".number").textContent = "?";
  document.querySelector(".life").textContent = life;

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".guess").value = "";
});
