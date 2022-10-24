var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

// When clicking on colours items
$(".controls").on("click", "li", function () {
    //  Deselect aibling elements
    $(this).siblings().removeClass("selected");
    //  Select clicked element
    $(this).addClass("selected");

    // Cache current color
    color = $(this).css("background-color");

});


// When New color is pressed by user
$("#revealColorSelect").click(function () {
    // Show color select or hide the color select
    changeColor();
    $("#colorSelect").toggle();
});

// Update the new color span
function changeColor() {
    var r = $("#red").val();
    var g = $("#green").val();
    var b = $("#blue").val();
    $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
}

// When new color sliders change
$("input[type=range]").change(changeColor);


// When add color is pressed
$("#addNewColor").click(function () {
    // Append the colours to the controls
    var $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    $(".controls ul").append($newColor);
    // Select the new added color
    $newColor.click();
});

// On mouse events on the canvas
$canvas.mousedown(function (e) {
    lastEvent = e;
    mouseDown = true;
}).mousemove(function (e) {
    // Draw lines
    if (mouseDown) {
        context.beginPath();
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle = color;
        context.lineWidth = 5;
        context.lineCap = 'round';
        context.stroke();
        lastEvent = e;
    }
}).mouseup(function () {
    mouseDown = false;
}).mouseleave(function () {
    $canvas.mouseup();
});

// Clear the canvas when button is clicked
function clear_canvas_width() {
    var s = document.getElementById("mainCanvas");
    var w = s.width;
    s.width = 10;
    s.width = w;
}
