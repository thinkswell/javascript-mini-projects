function start(duration, display_counter, currentTime, display_time){
    
    var timer = duration

    setInterval(function(){

        var countTimer = convert(timer)

        countTimer[1] = countTimer[1] < 10 ? "0" + countTimer[1] : countTimer[1];
        countTimer[2] = countTimer[2] < 10 ? "0" + countTimer[2] : countTimer[2];
        countTimer[3] = countTimer[3] < 10 ? "0" + countTimer[3] : countTimer[3];

        display_counter.textContent = countTimer[0] + ":" + countTimer[1] + ":" + countTimer[2] + ":" + countTimer[3];

        if(--timer < 0){
            timer = 0;
        }

        var curTime = convert(currentTime++);

        display_time.textContent = curTime[1] + ":" + curTime[2] + ":" + curTime[3];


    }, 1000)

}

window.onload = function(){

    var display = document.querySelector("#counter");

    start(timeUntil(), display, getCurrentSeconds(), document.querySelector("#time"));

}

function convert(seconds){
    
    var dd = Math.floor(seconds/86400);

    var hh = parseInt((seconds%86400)/3600);
    hh = hh <= 12 ? hh : hh - 12;
    var mm = parseInt(((seconds%86400)%3600)/60);
    var ss = parseInt(((seconds%86400)%3600)%60);

    return [dd, hh, mm, ss];
}

function getCurrentSeconds(){
    var date = new Date();

    var hh = date.getHours();
    hh *= 3600;

    var mm = date.getMinutes();
    mm *= 60

    return hh + mm + date.getSeconds();
}

function timeUntil(){

    var countDownDate = new Date("Oct 31, 2021 23:59:59").getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var time = seconds + minutes * 60 + hours * 3600 + days * 86400

    return time;
}

