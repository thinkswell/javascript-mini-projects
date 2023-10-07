
class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.accel = createVector(0, 0);
  }

  update() {
    this.vel.add(this.accel);
    this.pos.add(this.vel);
    this.accel.mult(0);
    this.vel.limit(4); // max-speed

    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;

    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  follow(flowField, scale) {
    let x = floor(this.pos.x / scale);
    let y = floor(this.pos.y / scale);
    let index = x + (y * cols);
    let force = flowField[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.accel.add(force);
  }

  draw() {
    strokeWeight(2);
    stroke(255);
    point(this.pos.x, this.pos.y);
  }
}