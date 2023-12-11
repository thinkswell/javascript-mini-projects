document.addEventListener('DOMContentLoaded', function () {
    var targetDate = new Date("Dec 31, 2023 23:59:59").getTime();
    var countdownFunction;
    var paused = false;
    var pausedTime;

    function updateTimer() {
        var now = new Date().getTime();
        var distance = targetDate - now;

        if (paused) {
            distance = pausedTime;
        }

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }

    document.getElementById("startButton").addEventListener("click", function() {
        if (!countdownFunction) {
            countdownFunction = setInterval(updateTimer, 1000);
        }
        if (paused) {
            targetDate = new Date().getTime() + pausedTime;
            paused = false;
        }
    });

    document.getElementById("pauseButton").addEventListener("click", function() {
        if (!paused) {
            pausedTime = targetDate - new Date().getTime();
            clearInterval(countdownFunction);
            countdownFunction = null;
            paused = true;
        }
    });

    document.getElementById("resetButton").addEventListener("click", function() {
        paused = false;
        clearInterval(countdownFunction);
        countdownFunction = null;
        targetDate = new Date("Dec 31, 2023 23:59:59").getTime();
        updateTimer();
    });

    updateTimer();
});
