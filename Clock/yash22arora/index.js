const hourHand= document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");
const secondHand = document.getElementById("second-hand");

const hourBlock = document.querySelector(".digital span.hours");
const minuteBlock = document.querySelector(".digital span.minutes");
const secondBlock = document.querySelector(".digital span.seconds");
const merideanBlock = document.querySelector(".digital span.meridean");

const dateText = document.getElementById("dateText");

function rotateHands(secDeg,minDeg,hourDeg)
{
    secondHand.style.transform=`rotate(${secDeg}deg)`;
    minuteHand.style.transform=`rotate(${minDeg}deg)`;
    hourHand.style.transform=`rotate(${hourDeg}deg)`;
}

function setDigital(hours, minutes, seconds, meridean)
{
    if(hours<10)
    {
    hourBlock.innerHTML="0"+hours;
    }
    else
    hourBlock.innerHTML=hours;

    if(minutes<10)
    {
    minuteBlock.innerHTML="0"+minutes;
    }
    else
    minuteBlock.innerHTML=minutes;

    if(seconds<10)
    {
    secondBlock.innerHTML="0"+seconds;
    }
    else
    secondBlock.innerHTML=seconds;

    merideanBlock.innerHTML=meridean;
}

function setTime()
{
    const now = new Date;
    const sec = now.getSeconds();
    const min = now.getMinutes();
    let hour = now.getHours();
    let meridean= "AM";
    const day = now.getDay();
    const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const date=now.getDate();
    const month= now.getMonth();
    const year = now.getFullYear();
    const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if(hour>12)
    {
        hour=hour-12;
        meridean="PM";
    }
    
    const secDeg=sec*360/60 + 90;
    const minDeg=min*360/60 +90;
    const hourDeg=hour*360/12 +90;

    rotateHands(secDeg, minDeg, hourDeg);
    setDigital(hour, min, sec, meridean);
    dateText.innerHTML= Days[day-1]+", "+Months[month]+" "+date+", "+year;
    
}

setInterval(setTime, 1000);

