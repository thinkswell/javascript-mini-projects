const clockDiv = document.querySelector('#clock');
const hourHand = document.querySelector('#hours');
const minuteHand = document.querySelector('#minutes');
const secondHand = document.querySelector('#seconds');

for(let number=1; number<=12; number++) {
    const numberDiv = document.createElement('div');
    numberDiv.classList.add('number');
    numberDiv.textContent = number;
    clockDiv.appendChild(numberDiv);
    
    const angle = number * 30;
    const radians = angle * Math.PI / 180;
    const x = Math.sin(radians) * (clockDiv.clientWidth / 2 - 20);
    const y = -Math.cos(radians) * (clockDiv.clientHeight / 2 - 20);
    numberDiv.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
}

setInterval(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    const hoursRotation = 30 * (hour % 12);
    const minutesRotation = 6 * minute;
    const secondsRotation = 6 * second;

    hourHand.style.transform = `rotate(${hoursRotation}deg)`;
    minuteHand.style.transform = `rotate(${minutesRotation}deg)`;
    secondHand.style.transform = `rotate(${secondsRotation}deg)`;
}, 1000);