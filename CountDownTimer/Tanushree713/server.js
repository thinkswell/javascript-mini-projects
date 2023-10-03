 let days = document.getElementById("days");
 let hours = document.getElementById("hours");
 let minutes = document.getElementById("minutes");
 let seconds = document.getElementById("seconds");

function countdown(){
let futureDate = new Date(" 12 November 2023 ");
let currentDate= new Date();
let remainingDate= futureDate-currentDate;

let showDays= Math.floor(remainingDate / 1000 / 60 / 60 / 24);
let showHours= Math.floor(remainingDate  / 1000 / 60 / 60) % 24;
let showMinutes= Math.floor(remainingDate / 1000 / 60) % 60;
let showSeconds= Math.floor(remainingDate / 1000) % 60;

if ((showDays==0)&&(showHours==0)&&(showMinutes==0)&&(showSeconds==0)){
    document.getElementById("heading2").innerHTML="!! HAPPIEST BIRTHDAY YASHI !!";
    document.getElementById("heading2").style.color= "#A1045A";
    clearInterval(clock);
}
else{
days.innerHTML=showDays;
hours.innerHTML=showHours;
minutes.innerHTML=showMinutes;
seconds.innerHTML=showSeconds;
}
}

let clock=setInterval(countdown,1000);
