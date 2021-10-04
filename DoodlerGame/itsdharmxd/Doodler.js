function Doodler(x, altitude, enemy, size, color) {

  this.location = createVector(x, altitude);
  this.velocity = createVector(0, 0);

  this.maxAltitude = altitude;  // max altitude
  this.premaxAltitude = altitude; // previous max altitude

  this.force = 12;

  this.color = color;
  this.size = size;

  this.enemy = enemy; // enemy or not

	this.drone = 0; // enemy Doodlers drone across the screen

  this.onScreen = true;
}

/**
 * changes location based upon velocity
 * moves enemy Doodlers across the screen
 */
Doodler.prototype.update = function() {

  if (this.enemy) {
		// drone across the screen

		this.drone += map(this.maxAltitude, 0, 15000, 0.0001, 0.1);
    this.location.x = (Math.sin(this.drone) * (width / 2)) + width / 2;
  } else {
		/* change locationation based upon velocityocationity and add air resistance */
    this.location.add(this.velocity);
    this.velocity.x *= 0.8;

		// apply GRAVITY
	  player.applyForce(createVector(0, GRAVITY));

		// update maximum altitude
    this.maxAltitude = (this.location.y > this.maxAltitude) ? this.location.y : this.maxAltitude;
  }

};

/**
 * sets velocityocationity to mimic a hop
 */
Doodler.prototype.jump = function() {

  this.velocity.y *= 0;

  if (this.premaxAltitude == this.maxAltitude) {
		// stronger hop as the altitude remains constant

    this.force = constrain(this.force + 1, 12, 16);
  } else {

    this.force = 12;
  }

  this.applyForce(createVector(0, this.force));

  this.premaxAltitude = this.maxAltitude;
};

/**
 * adds force to the velocityocationity
 */
Doodler.prototype.applyForce = function(force) {

  this.velocity.add(force);
};

/**
 * returns whether or not the doodler collides with another doodler
 */
Doodler.prototype.collidesWith = function(doodler) {

  var distance = dist(doodler.location.x, doodler.location.y, this.location.x, this.location.y);

  if (distance < (this.size / 2 + doodler.size / 2)) {
		// distance is greater than radii combined

    if (doodler.location.y < this.location.y) {
			// underneath doodler

      endGame();
      return false;
    } else {
      return true;
    }
  }
};

/**
 * draws the doodler with specific altitiude translation
 */
Doodler.prototype.draw = function(altitude) {

  stroke(255);
  strokeWeight(3);
  fill(this.color);

  if (this.enemy) {
		// draw relative to platforms

    if (altitude - this.location.y < height) {
			// if it is on-screen

      ellipse(this.location.x, altitude - this.location.y + height / 2, this.size);
    } else {
      this.onScreen = false;
    }
  } else {
		// draw regularly

    ellipse(this.location.x, height / 2, this.size);
  }

};
