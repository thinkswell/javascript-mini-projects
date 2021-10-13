setInterval(() => {
    let d = new Date();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    var a_p = " ";

    if (hour > 12) {
      a_p = "PM";
    } else {
      a_p = "AM";
    }

    if (hour > 12) {
      hour = hour - 12;
    }

    

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    let time = hour + ":" + minute + ":" + second + " " + a_p;
    let date = d.toLocaleDateString(undefined, options);

    document.getElementById("timeshow").innerHTML = time;
    document.getElementById("dateshow").innerHTML = date;
  }, 1000);