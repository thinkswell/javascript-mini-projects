document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("drawingCanvas");
    const context = canvas.getContext("2d");
    const clearButton = document.getElementById("clearButton");
    const colorPicker = document.getElementById("colorPicker");
    const lineWidth = document.getElementById("lineWidth");

    let isDrawing = false;

    canvas.addEventListener("mousedown", function (event) {
        isDrawing = true;
        context.beginPath();
        context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    });

    canvas.addEventListener("mousemove", function (event) {
        if (isDrawing) {
            context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
            context.strokeStyle = colorPicker.value;
            context.lineWidth = lineWidth.value;
            context.stroke();
        }
    });

    canvas.addEventListener("mouseup", function () {
        isDrawing = false;
        context.closePath();
    });

    clearButton.addEventListener("click", function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });
});
