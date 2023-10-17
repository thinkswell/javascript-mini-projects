// Wait for the HTML document to load before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Get the canvas element
    const canvas = document.getElementById("game");
    const context = canvas.getContext("2d");
  
    // Set up initial game state
    let player1Score = 0;
    let player2Score = 0;
    let gamePaused = false;
    let requestId;
  
    // Set up player positions and paddle dimensions
    const player1 = {
      x: 10,
      y: canvas.height / 2 - 50,
      width: 10,
      height: 100,
      dy: 0
    };
  
    const player2 = {
      x: canvas.width - 20,
      y: canvas.height / 2 - 50,
      width: 10,
      height: 100,
      dy: 0
    };
  
    // Set up ball properties
    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 10,
      dx: 5,
      dy: 5
    };
  
    // Draw the game elements
    function draw() {
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw the player scores
      context.font = "48px Arial";
      context.fillStyle = "#fff";
      context.fillText(player1Score, canvas.width / 2 - 50, 50);
      context.fillText(player2Score, canvas.width / 2 + 25, 50);
  
      // Draw the players' paddles
      context.fillStyle = "#fff";
      context.fillRect(player1.x, player1.y, player1.width, player1.height);
      context.fillRect(player2.x, player2.y, player2.width, player2.height);
  
      // Draw the ball
      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      context.fillStyle = "#fff";
      context.fill();
      context.closePath();
    }
  
    // Update game logic
    function update() {
      if (gamePaused) {
        return;
      }
  
      // Move the players' paddles
      player1.y += player1.dy;
      player2.y += player2.dy;
  
      // Move the ball
      ball.x += ball.dx;
      ball.y += ball.dy;
  
      // Check for collisions with the top and bottom walls
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
      }
  
      // Check for collisions with the players' paddles
      if (
        ball.x - ball.radius < player1.x + player1.width &&
        ball.y > player1.y &&
        ball.y < player1.y + player1.height
      ) {
        ball.dx *= -1;
      } else if (
        ball.x + ball.radius > player2.x &&
        ball.y > player2.y &&
        ball.y < player2.y + player2.height
      ) {
        ball.dx *= -1;
      }
  
      // Check for scoring
      if (ball.x + ball.radius > canvas.width) {
        player1Score++;
        resetBall();
      } else if (ball.x - ball.radius < 0) {
        player2Score++;
        resetBall();
      }
  
      // Call the draw function to update the canvas
      draw();
    }
  
    // Reset the ball to the center of the canvas
    function resetBall() {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.dx = Math.sign(ball.dx) * 5;
      ball.dy = Math.sign(ball.dy) * 5;
    }
  
    // Set up event listeners for player movement
    document.addEventListener("keydown", function(event) {
      if (event.key === "w") {
        player1.dy = -5;
      } else if (event.key === "s") {
        player1.dy = 5;
      } else if (event.key === "ArrowUp") {
        player2.dy = -5;
      } else if (event.key === "ArrowDown") {
        player2.dy = 5;
      }
    });
  
    document.addEventListener("keyup", function(event) {
      if (event.key === "w" || event.key === "s") {
        player1.dy = 0;
      } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        player2.dy = 0;
      }
    });
  
    // Set up event listeners for buttons
    const pauseButton = document.getElementById("pause");
    pauseButton.addEventListener("click", function() {
      gamePaused = true;
      cancelAnimationFrame(requestId);
    });
  
    const resumeButton = document.getElementById("resume");
    resumeButton.addEventListener("click", function() {
      gamePaused = false;
      requestId = requestAnimationFrame(gameLoop);
    });
  
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", function() {
      player1Score = 0;
      player2Score = 0;
      resetBall();
      cancelAnimationFrame(requestId);
      requestId = requestAnimationFrame(gameLoop);
    });
  
    // Game loop
    function gameLoop() {
      update();
      requestId = requestAnimationFrame(gameLoop);
    }
  
    // Start the game loop
    gameLoop();
  });
  