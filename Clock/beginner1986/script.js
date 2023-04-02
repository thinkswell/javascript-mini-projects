let clockDiv = document.querySelector('#clock');

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
