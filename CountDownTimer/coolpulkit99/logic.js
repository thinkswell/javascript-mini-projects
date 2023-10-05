var intervalVariable = undefined;
var timeleft = 0;
var totaltime = 0;
function startTimer() {
    totaltime = document.getElementById("input").value;

    timeleft = totaltime;
    if(totaltime=="")
    return;

    document.getElementById("userinputscreen").style.display="none";
    document.getElementById("timerscreen").style.display="flex";
    
    intervalVariable = setInterval(
        updateTime
        , 1000
    );
}

function resetTimer() {
    location.reload();
}

function updateTime() {
    // console.log(timeleft);
    timeleft = timeleft - 1;

    // console.log(timeleft);
    if (timeleft < 0) {
        clearInterval(intervalVariable);
    } else {
        let timer = document.getElementById("timer");
        timer.innerHTML = "" + timeleft;

        if (timeleft <= 10)
            timer.style.color = "red";
        else
            timer.style.color = "green";

    }
}