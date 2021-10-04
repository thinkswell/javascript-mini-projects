function Platform(x, altitude, size, color) {

  this.x = x;
  this.altitude = altitude;

  this.size = size;
  this.color = color;

  this.onScreen = true;
}

/**
 * draws platform at altitude
 */
Platform.prototype.draw = function(altitude) {

  stroke(255);
  strokeWeight(3);
  fill(this.color);

	// relative to player
  if (altitude - this.altitude < height / 2) {
		// on-screen

    rect(this.x, (altitude - this.altitude + height / 2) , this.size, 15);
  } else {
    this.onScreen = false;
  }
};

/**
 * returns whether passed Doodler hits the platform
 */
Platform.prototype.collidesWith = function(doodler) {

  var platformTop = this.altitude;
  var doodlerBottom = doodler.location.y - doodler.size / 2 ;

  stroke("#FF0000");
  strokeWeight(10);

  if (Math.abs(platformTop - doodlerBottom) < -doodler.velocity.y && platformTop < doodlerBottom) {

    var platformLeftX = this.x; // platform lefter-most x bound
    var platformRightX = this.x + this.size; // platform righter-most x bound

    var doodlerLeftX = doodler.location.x - doodler.size / 2; // doodler lefter-most x bound
    var doodlerRightX = doodler.location.x + doodler.size / 2; // doodler righter-most x bound

    return ((doodlerLeftX >= platformLeftX && // if the doodler's left X falls between the platform
			doodlerLeftX <= platformRightX) ||
			(doodlerRightX >= platformLeftX && // if the doodler's right X falls between the platform
			doodlerRightX <= platformRightX));
  }

  return false;
};
