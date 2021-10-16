const hourHand = document.getElementById('hr');
const minuteHand = document.getElementById('min');
const secondHand = document.getElementById('sec');
const toggleBtn = document.getElementById('toggle');

setInterval(() => {
    const date = new Date();

    hr = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();

    hr_Rotation = 30 * hr + min /2;
    min_Rotation = 6 * min;
    sec_Rotation = 6 * sec;

    hourHand.style.transform = `rotate(${hr_Rotation}deg)`;
    minuteHand.style.transform = `rotate(${min_Rotation}deg)`;
    secondHand.style.transform = `rotate(${sec_Rotation}deg)`;

},1000);

toggleBtn.addEventListener('click', () =>{
    document.querySelector('.container').classList.toggle('active');
})
