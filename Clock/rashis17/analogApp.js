// DOM elements
const canvas = document.getElementById("clock");
const button = document.querySelector(".center");

const ctx = canvas.getContext("2d");

let radius = canvas.height / 2;

ctx.translate(radius, radius);
radius = radius*0.90;
setInterval(drawClock, 1000);

function drawClock() {
    drawCircle();
    drawFace();
    drawNumbers();
    drawTime();
}

function drawCircle(){
    ctx.arc(0,0,radius,0,2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
}

function drawFace(){
    let grad;

    ctx.beginPath();
    ctx.arc(0,0,radius,0,2*Math.PI);
    ctx.fillStyle ="white";
    ctx.fill;

    grad = ctx.createRadialGradient(0,0,0.95*radius,0,0,1.05*radius);
    grad.addColorStop(0, 'white');
    grad.addColorStop(0.5, '#333');
    grad.addColorStop(1, 'white');

    ctx.strokeStyle = grad;

    ctx.lineWidth = radius*0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0,0,radius*0.1, 0,2*Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
}

function drawNumbers(){
    let ang,num;
    ctx.font = radius*0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
   
    for(num=1; num<=12;num++)
    {
        ang = num* Math.PI/6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(),0,0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
}

function drawTime() {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    hour = hour%12;
    hour = (hour*Math.PI/6) + (minute * Math.PI/6*60) + (second * Math.PI/6*60*60);
    drawHand(hour,radius*0.5, radius*0.07);

    minute = (minute * Math.PI/30) + (second * Math.PI/30*60);
    drawHand(minute, radius*0.8, radius*0.07);

    second = (second* Math.PI/30);
    drawHand(second, radius*0.8, radius*0.03);
}

function drawHand(pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0,-length);
    ctx.strokeStyle = "#333"
    ctx.shadowBlur = 0;
    ctx.stroke();
    ctx.rotate(-pos);
}

button.addEventListener('click', (e) => {
    document.location.href = "digitalClock.html";
})