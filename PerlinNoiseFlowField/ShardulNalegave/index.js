
const inc = 0.1;
let zoff = 0;
const scale = 40;
let rows, cols;
let fr;

const flowField = [];
const numParticles = 600;
const particles = [];

function setup() {
  createCanvas(1000, 800);
  cols = floor(width / scale);
  rows = floor(height / scale);
  fr = createP('');

  for (let i = 0; i < numParticles; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  background(0);

  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;

    for (let x = 0; x < cols; x++) {
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.5);
      xoff += inc;
      
      let index = x + (y * cols);
      flowField[index] = v;

      stroke(255, 50);
      strokeWeight(1);
      push();
      translate(x * scale, y * scale);
      rotate(v.heading());
      line(0, 0, scale, 0);
      pop();
    }

    yoff += inc;
    zoff += 0.0003;
  }

  for (let i = 0; i < numParticles; i++) {
    particles[i].follow(flowField, scale);
    particles[i].update();
    particles[i].draw();
  }

  fr.html(floor(frameRate()));
}