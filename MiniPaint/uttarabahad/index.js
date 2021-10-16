var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
var bound = canvas.getBoundingClientRect();
var c = canvas.getContext('2d');

var xlim = canvas.width;
var ylim = canvas.height;

var color = document.getElementById("color");
var radius = document.getElementById("radius");

var mouse = {
    x: 0,
    y: 0,
    down: false
};

var smoothen = [];

function draw() {
    c.beginPath();
    c.fillStyle = color.value;
    c.arc(mouse.x, mouse.y, Math.abs(Number(radius.value)),0, Math.PI*2, false);
    c.fill();
    c.closePath();
}

function erase() {
    color.value = "#FFFFFF";
}

function eraseWhole() {
    c.clearRect(0, 0, xlim, ylim);
}

addEventListener("mousemove", (e)=> {
    mouse.x = e.clientX - bound.left;
    mouse.y = e.clientY - bound.top;
    if (mouse.down) {
        smoothen.push({
            x:mouse.x,
            y:mouse.y
        })
        draw();
    }
})

addEventListener("mousedown", (e)=> {
    mouse.down = true;
})
addEventListener("mouseup", (e)=>  {
    mouse.down = false;
    for(var i = 0; i<smoothen.length-1; i++){
        c.beginPath();
        c.strokeStyle = color.value;
        c.lineWidth = Number(radius.value)*2;
        c.moveTo(smoothen[i].x, smoothen[i].y);
        c.lineTo(smoothen[i+1].x, smoothen[i+1].y);
        c.stroke();
        c.closePath();
    }
    smoothen = [];
})