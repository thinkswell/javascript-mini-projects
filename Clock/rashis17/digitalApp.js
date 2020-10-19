// DOM Element
const timeDOM = document.querySelector(".time");
const dateDOM = document.querySelector(".currentDate");
const dayDOM = document.querySelector(".day");
const button = document.querySelector(".center");

function timer()
{
    const dateObject = new Date();

    let currentDate = dateObject.toLocaleDateString();
    let currentTime = dateObject.toLocaleTimeString();

    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let currentDay = weekday[dateObject.getDay()];

    timeDOM.textContent = currentTime;
    dateDOM.textContent = currentDate;
    dayDOM.textContent = currentDay;
}

setInterval(timer, 1000);

button.addEventListener('click', (e) => {
    document.location.href = "analogClock.html";
})