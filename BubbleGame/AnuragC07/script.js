var timer = 60;
var score = 0;
var hitrn;


function increaseScore() {
    score += 10;
    document.querySelector("#scoreVal").textContent = score;
}

function getNewHit() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitNum").textContent = hitrn;
}



function makeBubble() {
    var clutter = "";
    for (var i = 1; i <= 180; i++) {
        var rn = Math.floor(Math.random() * 10)
        clutter += `<div class="bubble">${rn}</div>`;
    }
    document.querySelector("#pbtm").innerHTML = clutter;
}



function runTimer() {
    var timerInt = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerInterval").textContent = timer;
        }
        else {
            clearInterval(timerInt);
            document.querySelector("#pbtm").innerHTML = `<h1>Game Over <br>
            Your Score is = ${score}</h1>`;
            document.querySelector("#hitNum").textContent = 0;
            document.querySelector("#scoreVal").textContent = 0;
        }
    }, 1000);
}


document.querySelector("#pbtm") 
    .addEventListener("click", function(dets){
       var clickednum = Number(dets.target.textContent);
       if(clickednum == hitrn) {
        increaseScore();
        makeBubble();
        getNewHit();
       }
    });

runTimer();
makeBubble();
getNewHit();
