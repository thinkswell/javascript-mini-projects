const clockContainer = document.querySelector('#clock');
const hourHand = document.querySelector('#hours');
const minuteHand = document.querySelector('#minutes');
const secondHand = document.querySelector('#seconds');

const placeNumbers = () => {
    for(let number=1; number<=12; number++) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.textContent = number;
        clockContainer.appendChild(numberDiv);
        
        const angle = number * 30;
        const radians = angle * Math.PI / 180;
        const offset = clockContainer.clientWidth / 2 * 0.1;
        const x = Math.sin(radians) * (clockContainer.clientWidth / 2 - offset);
        const y = -Math.cos(radians) * (clockContainer.clientHeight / 2 - offset);
        numberDiv.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
    }
};

const clearNumbers = () => {
    const numbers = document.querySelectorAll('.number');

    numbers.forEach((number => {
        number.remove();
    }));
};

const updateClockHands = () => {
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
};

placeNumbers();
updateClockHands();

window.addEventListener('resize', () => {
    clearNumbers();
    placeNumbers();
});