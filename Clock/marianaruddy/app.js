const list = document.querySelector(".wrapper");

function startClocks() {
    const now = new Date();
    
    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hours = now.getHours();
    
    var diff = now.getTimezoneOffset() / 60;
    
    const timezones = [
        {
            city: 'Local',
            hours: hours,
        },
        {
            city: 'New York',
            hours: hours + diff - 4,
        },
        {
            city: 'Rio de Janeiro',
            hours: hours + diff - 3,
        },
        {
            city: 'Tokyo',
            hours: hours + diff + 9,
        },
    ];
    
    list.innerHTML = '';
    
    for (var i = 0; i<timezones.length; i++) {
        var timezoneHrs = timezones[i].hours;
        var cityName = timezones[i].city;
        var time = document.createTextNode(`
            ${cityName}: ${timezoneHrs < 10 ? `0${timezoneHrs}` : timezoneHrs}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}\n
        `);
        var div = document.createElement("div");
        div.className = "timezome-wrapper";
        div.id = `timezome-wrapper-${i}`;
        
        var newTimezone = document.createElement("h1");
        newTimezone.className = "timezome";
        newTimezone.id = `timezome-${i}`;
        
        newTimezone.appendChild(time);
        newTimezone.appendChild(time);
        div.appendChild(newTimezone);
        list.appendChild(div);
    }
}

setInterval(startClocks, 1000);
