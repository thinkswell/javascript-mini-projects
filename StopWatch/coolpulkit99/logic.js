var intervalVariable = undefined;
var timeleft = 0;
var totaltime = 0;
function startTimer() {


    intervalVariable = setInterval(
        updateTime
        , 10
    );
}

function resetTimer() {
    stopTimer();
    timeleft = -10;
    updateTime();
}
function stopTimer() { 
    clearInterval(intervalVariable);

}

function updateTime() {
    timeleft = timeleft + 10;

    let timers = document.getElementById("timers");
    let timerms = document.getElementById("timerms");
    let milli = timeleft % 1000;

    timers.innerHTML = Math.floor(timeleft / 1000);

    timerms.innerHTML = Math.floor(milli / 10);


    timers.style.color = "green";
    timerms.style.color = "red";



}