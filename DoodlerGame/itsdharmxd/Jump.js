
const GRAVITY = -0.9;

var player;
var points;

var platforms = [];

function setup() {

  createCanvas(400, 600);

  player = new Doodler(width / 2, height / 2, false, 30, color("#000070"));

  platforms = generatePlatforms();

  points = 0;

  frameRate(60);
}

function draw() {

  background(51);

  handlePlayer();

  handlePlatforms();

	drawScore();

  handleKeys();
}

/**
 * updates, draws, and applies GRAVITY to player
 * checks if the player falls
 */
function handlePlayer() {

	player.update();
  player.draw();

  if (player.maxAltitude + player.location.y < -height / 2) {
    /* end game */
    endGame();
  }
}

/**
 * checks collision, draws, and manages all platforms
 */
function handlePlatforms() {

  for (var i = platforms.length - 1; i >= 0; i--) {
		// loop through platforms backward

    if (platforms[i].onScreen) {

      platforms[i].draw(player.location.y);

			if (platforms[i] instanceof Doodler)
				platforms[i].update(); // update Doodlers

      if (platforms[i].collidesWith(player)) {

        player.jump();
        if (platforms[i] instanceof Doodler) {
					// it's not a platform, but a doodler!

          points += 100;
          platforms.splice(i, 1); // remove from array
        }
      }
    } else {

      /* no longer on-screen, delete previous platforms */
      platforms.splice(i, 1);

			/* push new platform */
      var x = noise(player.maxAltitude, frameCount) * width;
      var y = player.maxAltitude + height;

      if (random() < 0.9) {
				// 90% chance of being a regular platform

        platforms.push(new Platform(x, y, 55, color("#0080F0")));
      } else {

        if (random() > 0.5) {
					// 5% chance of being a doodler

					platforms.push(new Doodler(x, y, true, 50, color("#00FFFF")));
				}

				// 5% chance of not regenerating
      }
    }
  }
}

/**
 * initializes platforms
 */
function generatePlatforms() {

	var field = []; // returning array

	for (var y = 0; y < height * 2; y += 40) {
		// loop through Y

    for (var i = 0; i < 3; i++) { // attempt 3 new platforms

      var x = noise(i, y) * width;

      if (noise(y, i) > 0.5) // 50% chance of a new platform
        field.push(new Platform(x, y, 55, color("#0080F0")));
    }
  }

	return field;
}

/**
 * moves player based upon user input
 */
function handleKeys() {

  if (keyIsDown(LEFT_ARROW)) {

    player.applyForce(-1, 0);
  } else if (keyIsDown(RIGHT_ARROW)) {

    player.applyForce(1, 0);
  }
}

/**
 * draws the score
 */
function drawScore() {

  textSize(30);
  textAlign(LEFT);
  fill(255);
  noStroke();
  text((player.maxAltitude + points).toFixed(0), 50, 50);
}

/**
 * ends loop, draws game over message
 */
function endGame() {

  textAlign(CENTER);
  textSize(60);
  noStroke();
  fill("#90FF90");
  text("Game Over!", width / 2, height / 2);
  noLoop();
}
