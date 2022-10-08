function time(){
    let date = new Date();
    let hours = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let today = date.getUTCDate();
        let month = date.getUTCMonth();
        let year = date.getUTCFullYear();
        let hr;
        if(hours == "12"){
            hr=12;
        }else if (hours == "24"){
            hr=0;
        }else {
            hr = hours%12;
        }
        if(hr<10){
            hr="0"+hr;
        }
        if(min<10){
            min="0"+min;
        }
        if(sec<10){
            sec="0"+sec;
        }
        switch(true){
            case month == 0: month = "Jan";
            break;
            case month == 1: month = "Feb"
            break;
            case month == 2: month = "Mar"
            break;
            case month == 3: month = "Apr"
            break;
            case month == 4: month = "May"
            break;
            case month == 5: month = "June"
            break;
            case month == 6: month = "July"
            break;
            case month == 7: month = "Aug"
            break;
            case month == 8: month = "Sep"
            break;
            case month == 9: month = "Oct"
            break;
            case month == 10: month = "Nov"
            break;
            case month == 11: month = "Dec"

        }

        let ampm = hours<12?"AM" : "PM";
        let timed =hr+":"+min+":"+sec+""+ampm+'\n  '+today+" "+month+" "+year;
        document.getElementById('clock').innerText=timed;
}
setInterval(time, 1000);