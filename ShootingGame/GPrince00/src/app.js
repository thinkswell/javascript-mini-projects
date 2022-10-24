const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const radius = 10;
let xrandom = drawPosition(canvas.width);
let yrandom = drawPosition(canvas.height);
let running = false;
let frames = 0;
let position = 0;
let difficultLevel = 80;

const drawCircle = (x, y, radius, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();

}

const resetCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const drawTarget = (x, y) => {
    drawCircle(x, y, radius + 20, 'red');
    drawCircle(x, y, radius + 10, 'white');
    drawCircle(x, y, radius, 'red');
}

function drawPosition(maximo) {
    return Math.floor(Math.random() * maximo);
}

const updateCanvas = () => {
    if (frames % difficultLevel === 0) {        
        resetCanvas();
        xrandom = drawPosition(canvas.width);
        yrandom = drawPosition(canvas.height);
        drawTarget(xrandom, yrandom);
      }
}

const checkCollision = (event) => {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;

    if ((x > xrandom - radius)
        && (x < xrandom + radius)
        && (y > yrandom - radius)
        && (y < yrandom + radius)) {
        nextLevel();
    }
}

canvas.onclick = checkCollision;

const nextLevel = () => {
    var levelArray = [1, 2, 3, 4, 5, 6, 7, 8, 'Hard core'];
    position++;
    alert('Congrats! Level: ' + levelArray[position]);
    difficultLevel -= 7;
}

const render = () => {
    updateCanvas();
    frames += 1;
    if (running) {
        window.requestAnimationFrame(render);
      }
}

running = true;
render();