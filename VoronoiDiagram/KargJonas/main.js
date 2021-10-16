const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");

const width = 100;
const height = 100;

cnv.width = width;
cnv.height = height;

const startTime = Date.now();
const millis = () => Date.now() - startTime;
const rand = (max) => Math.random() * max;
const randColor = () => `rgb(${rand(255)}, ${rand(255)}, ${rand(255)})`;

class vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.offset = rand(3);
  }

  update() {
    this.x += Math.sin(millis() / 1000 + this.offset) * 0.5;
    this.y += Math.cos(millis() / 1000 + this.offset) * 0.5;
  }
}

const randPoint = () => new vec(
  20 + rand(width - 40),
  20 + rand(height - 40)
);

const points = [];

for (let i = 0; i < 8; i++) points.push(randPoint());

const colors = points.map(randColor);

const dist = (p1, p2) =>
  Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

const setPixel = (x, y, c) => {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, 1, 1);
};

function render() {
  for (let y = 0; y < cnv.height; y++)
  for (let x = 0; x < cnv.width; x++) {
    const p = new vec(x, y);

    const distances = points
      .map((point, index) => ({
        index,
        dist: dist(point, p),
      }))
      .sort((a, b) => a.dist - b.dist);

    setPixel(x, y, colors[distances[0].index]);
  }
}

function loop() {
  requestAnimationFrame(loop);

  for (const point of points) point.update();

  render();

  ctx.fillStyle = '#000';
  ctx.fill();
}

loop();