let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let started = false;
let level = 0;
let highScore = 0;
let gameMode = null; // Game mode is null initially

// Display the high score and level
$("#high-score").text(highScore);
$("#current-level").text(level);

// Start Game Button Click Event
$("#start-button").on("click", function () {
  if (!gameMode) {
    alert("Please select a mode (Normal or Strict) to start the game!");
    return;
  }

  if (!started) {
    $("#level-title").text("Happy Gaming! - Simon");
    nextSequence();
    started = true;
    $(this).hide();
  }
});

// End Game Button Click Event
$("#end-button").on("click", function () {
  if (!started) return; // Do nothing if the game hasn't started

  // End the game by resetting all values
  $("#level-title").text("Game Ended. Press Start to Restart");
  updateHighScore(); // Save high score before resetting
  startOver(); // Reset the game state
  $("#start-button").show(); // Show the Start button again
});

// Mode Selection (Normal/Strict)
$("input[name='mode']").on("change", function () {
  gameMode = $(this).val();
  alert(`Game mode set to: ${gameMode.toUpperCase()}`);
});

// User Clicks on a Button
$(".btn").on("click", function () {
  if (!started) return;

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Check User's Answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over. Press Start to Retry.");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    if (gameMode === "strict") {
      updateHighScore();
      startOver(); // Strict mode resets the game completely
    } else {
      userClickedPattern = []; // Normal mode allows retrying the same sequence
    }
  }
}

// Generate the Next Sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#current-level").text(level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Play Sound Based on Button Colour
function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

// Animate Button Press
function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

// Start Over Function (Resets Game State)
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  $("#current-level").text(level);
}

// Update High Score
function updateHighScore() {
  if (level > highScore) {
    highScore = level - 1; // Subtract 1 because the game increments the level before game over
    $("#high-score").text(highScore);
  }
}

// Toggle Dark/Light Mode
$("#mode-toggle").on("click", function () {
  $("body").toggleClass("dark-mode");
  $(this).toggleClass("dark-mode");
});
