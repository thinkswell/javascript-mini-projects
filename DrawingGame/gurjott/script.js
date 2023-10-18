// Get canvas element and drawing context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Variables for tracking drawing state
let drawing = false;
let lastX = 0;
let lastY = 0;

// Set line style
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;

// Function to start drawing
function startDrawing(e) {
    drawing = true;
    [lastX, lastY] = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop];
}

// Function to draw a line
function draw(e) {
    if (!drawing) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    [lastX, lastY] = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop];
    ctx.lineTo(lastX, lastY);
    ctx.stroke();
}

// Function to stop drawing
function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

// Event listeners for drawing
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Clear canvas button
const clearButton = document.getElementById('clear-btn');
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
