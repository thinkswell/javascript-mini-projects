// eraserSize.addEventListener("")

const canvas = document.querySelector("#draw");

const ctx = canvas.getContext("2d");
console.log(ctx);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#4400ff";
ctx.lineCap = "round";
ctx.lineJoin = "round";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let mode = "pen";
let lastColor = ctx.strokeStyle;
let lastWidth = 1;
let eraseWidth = 1;

const color = document.querySelector("input[type='color']");
const lineWidth = document.querySelector("input[type='number']");
const eraserSize = document.querySelector("input[type='range']");
const modePen = document.querySelector("#pen");
const modeErase = document.querySelector("#erase");

console.log(modePen);
console.log(modeErase);

function setColor() {
  mode = "pen";
  lastColor = this.value;
  document.documentElement.style.setProperty(`--${this.type}`, `${this.value}`);
}

color.addEventListener("mousemove", setColor);
color.addEventListener("mouseover", setColor);
color.addEventListener("change", setColor);

function setLineWidth() {
  mode = "pen";
  lastWidth = this.value;
}

lineWidth.addEventListener("mousemove", setLineWidth);
lineWidth.addEventListener("mouseover", setLineWidth);
lineWidth.addEventListener("change", setLineWidth);

function setEraseSize() {
  mode = "eraser";
  eraseWidth = this.value;
  document.documentElement.style.setProperty(
    `--${mode}`,
    `${this.value * 0.7}px`
  );
}

eraserSize.addEventListener("mousemove", setEraseSize);
eraserSize.addEventListener("mouseover", setEraseSize);
eraserSize.addEventListener("change", setEraseSize);

function changeMode(newMode) {
  mode = newMode;
}

modePen.addEventListener("click", () => changeMode("pen"));
modeErase.addEventListener("click", () => changeMode("eraser"));

function draw(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  if (mode === "pen") {
    ctx.lineWidth = lastWidth;
    ctx.strokeStyle = lastColor;
    ctx.stroke();
  } else {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = eraseWidth;
    ctx.stroke();
  }
  [lastX, lastY] = [e.offsetX, e.offsetY];
  console.log(ctx);
  console.log(canvas);
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", e => {
  isDrawing = false;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseout", () => (isDrawing = false));
