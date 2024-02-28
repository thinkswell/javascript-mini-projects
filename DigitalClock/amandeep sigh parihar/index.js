setInterval(currentTime, 1000);

function currentTime()
{
    let time = new Date();   // creating object of Date class
    let dayName=time.getDay();
    let month=time.getMonth();
    let year=time.getFullYear();
    let date=time.getDate();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();

    var am_pm = "AM";
    if(hour==12)
    am_pm = "PM";
    if (hour > 12) {
    hour -= 12;
    am_pm = "PM";
    }
    if (hour == 0) {
    hour = 12;
    am_pm = "AM";
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

   //value of current time
   let currentTime = hour + ":" + min + ":" + sec +" "+ am_pm;

  // value of present day(Day, Month, Year)
  var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
  var week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  var presentDay=week[dayName]+", "+months[month]+" "+date+", "+year;

  const clock = document.getElementById("time");
  const dayIntro=document.getElementById("dayName");

  clock.innerHTML = currentTime;
  dayIntro.innerHTML = presentDay;
}

currentTime();  //calling currentTime() function to initiate the process