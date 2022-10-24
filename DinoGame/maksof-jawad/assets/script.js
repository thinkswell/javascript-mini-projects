const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus")
var score = 0;
function jump(){
    if(dispatchEvent.classList!="jump") //first it checks if the dino is mid-jump. If not, it makes it jump.
    {
       dino.classList.add("jump");
        setTimeout (function(){
            dino.classList.remove("jump"); //removes the jump class from the dino once it has jumped so that it can jump again
        },300)
    }
}

let checkAlive = setInterval(function(){
    
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    score++
    let scoreLabel = document.getElementById('score').innerText = score
    //check for collision
    if(cactusLeft>0 && cactusLeft<70 && dinoTop>=143){
        dino.style.animationPlayState = 'paused';
        cactus.style.animationPlayState = 'paused';
        alert(`Whoops! Game Over :( your score is ${score}`);
        window.location.reload();
    }
},100);

document.addEventListener("keydown", function(event){
    jump();
})