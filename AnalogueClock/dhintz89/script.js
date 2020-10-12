function getTime() {
    date = new Date();
    switch (date.getDay()) {
        case 0:
            day = "Sun";
            break;
        case 1:
            day = "Mon";
            break;
        case 2:
            day = "Tue";
            break;
        case 3:
            day = "Wed";
            break;
        case 4:
            day = "Thu";
            break;
        case 5:
            day = "Fri";
            break;
        case 6:
            day = "Sat";
            break;
    }
    return {day: day, hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds()};
}

function tick() {
    const hourHand = document.querySelector(".hour");
    const minHand = document.querySelector(".minute");
    const secHand = document.querySelector(".second");
    const digitalClock = document.querySelector(".digWindow");
    time = getTime()
    
    // hour hand
    if(time.hour > 12) {
        hourHand.style.transform = `rotate(${(360 / 12) * (time.hour - 12)}deg)`;
    } else {
        hourHand.style.transform = `rotate(${(360 / 12) * time.hour}deg)`;
    }
    // minute hand
    minHand.style.transform = `rotate(${(360 / 60) * time.minute}deg)`;
    // second hand
    secHand.style.transform = `rotate(${(360 / 60) * time.second}deg)`;

    // digital window
    digitalClock.innerHTML = `${time.day} - ${time.hour} : ${time.minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`;
}

let interval = setInterval(tick, 1000);