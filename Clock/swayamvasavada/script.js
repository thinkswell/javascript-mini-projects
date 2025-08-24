const clockContainer = document.getElementById('clock-container');

function updateTime() {
    const currentTime = new Date().toLocaleTimeString();

    clockContainer.innerText = currentTime;
}

setInterval(updateTime, 1000);