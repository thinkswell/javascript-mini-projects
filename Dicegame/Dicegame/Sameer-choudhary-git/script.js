var player1 = Math.floor(Math.random() * 6) + 1;
var player2 = Math.floor(Math.random() * 6) + 1;

if (player1 > player2) {
    document.querySelector("h1").innerHTML = "Player 1 won"
} else if (player2 > player1) {
    document.querySelector("h1").innerHTML = "Player 2 won"
} else {
    document.querySelector("h1").innerHTML = "Draw"
}

var p1_dice = "images/dice" + player1 + ".png"
var p2_dice = "images/dice" + player2 + ".png"


document.querySelector(".img1").src = p1_dice
document.querySelector(".img2").src = p2_dice

