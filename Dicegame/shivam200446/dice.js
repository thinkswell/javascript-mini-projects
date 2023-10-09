var randomnum1 = Math.floor(Math.random() * 6) + 1;
var randomimg = "dice" + randomnum1 + ".png";
var imgsource1 = "images/" + randomimg;
var image1 = document.querySelectorAll("img")[0].setAttribute("src", imgsource1);

var randomnum2 = Math.floor(Math.random() * 6) + 1;
var imgsource2 = "images/" +"dice" + randomnum2 + ".png";
var image2 = document.querySelectorAll("img")[1].setAttribute("src", imgsource2);

if(randomnum1>randomnum2){
document.querySelector("h1").innerHTML ="Player1 Wins!";
}
else if(randomnum1<randomnum2){
    document.querySelector("h1").innerHTML="Player2 Wins!";
} 
else{
    document.querySelector("h1").innerHTML= "DRAW!";
}