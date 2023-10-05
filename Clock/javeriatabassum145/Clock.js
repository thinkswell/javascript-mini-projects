let date, time, hours, minutes, seconds;

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


setInterval(() => {
    date = new Date();

    // Hours in double digit
    currentHours = date.getHours();
    currentHours = ("0" + currentHours).slice(-2)
    document.getElementById('hours').innerHTML = currentHours;

    // Minutes in double digit
    currentMinutes = date.getMinutes();
    currentMinutes = ("0" + currentMinutes).slice(-2)
    document.getElementById('minutes').innerHTML = currentMinutes;

    // Seconds in double digit
    currentSeconds = date.getSeconds();
    currentSeconds = ("0" + currentSeconds).slice(-2)
    document.getElementById('seconds').innerHTML = currentSeconds;

    // Current Date
    today = date.toLocaleDateString(undefined, options);
    document.getElementById('date').innerHTML = today;

}, 1000);