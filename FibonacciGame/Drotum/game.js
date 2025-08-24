// Memoization for Fibonacci calculation
const fibCache = {};
function fibonacci(n) {
  if (n <= 1) return n;
  if (fibCache[n]) return fibCache[n];
  fibCache[n] = fibonacci(n - 1) + fibonacci(n - 2);
  return fibCache[n];
}

let level = 1;
let currentSequence = [];
let clickedNumbers = [];
let correctFibIndex = 0;
let gameActive = true;
let timerInterval;
let timeLeft = 60; // Default time in seconds
let gamePaused = false;
const numbers = [];
let startFromIndex = 5; // Will be randomized per level

// Difficulty settings
const difficultySettings = {
  easy: { distractors: 5, time: 90 },
  medium: { distractors: 10, time: 60 },
  hard: { distractors: 20, time: 30 }
};

// HTML Elements
const gameBoard = document.getElementById('gameBoard');
const levelDisplay = document.getElementById('levelDisplay');
const messageDisplay = document.getElementById('message');
const correctSequenceDisplay = document.getElementById('correctSequence');
const timerDisplay = document.getElementById('timerDisplay');
const pauseButton = document.getElementById('pauseButton');
const difficultySelect = document.getElementById('difficulty');
const leaderboardList = document.getElementById('leaderboardList');
const restartButton = document.getElementById('restartButton');

// Sound Elements
const correctSound = document.getElementById('correctSound');
const incorrectSound = document.getElementById('incorrectSound');
const levelUpSound = document.getElementById('levelUpSound');

// Leaderboard
let leaderboard = JSON.parse(localStorage.getItem('fibLeaderboard')) || [];

// Function to update the leaderboard display
function updateLeaderboard() {
  leaderboardList.innerHTML = '';
  leaderboard.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `Level ${entry.level} - Time: ${entry.time}s`;
    leaderboardList.appendChild(li);
  });
}

// Function to add a new score to the leaderboard
function addToLeaderboard(levelAchieved, timeTaken) {
  leaderboard.push({ level: levelAchieved, time: timeTaken });
  leaderboard.sort((a, b) => {
    if (b.level === a.level) return a.time - b.time;
    return b.level - a.level;
  });
  leaderboard = leaderboard.slice(0, 10);
  localStorage.setItem('fibLeaderboard', JSON.stringify(leaderboard));
  updateLeaderboard();
}

// Function to generate a Fibonacci sequence for the level, starting from a specified number
function generateFibonacciSequence(level, startFromIndex) {
  const sequence = [];
  for (let i = startFromIndex; i < startFromIndex + level + 5; i++) {
    sequence.push(fibonacci(i));
  }
  return sequence;
}

// Function to generate non-Fibonacci numbers close to the Fibonacci sequence
function generateNonFibonacciNumbers(count, fibNumbers) {
  const nonFib = [];
  while (nonFib.length < count) {
    const randomFib = fibNumbers[Math.floor(Math.random() * fibNumbers.length)];
    const offset = Math.floor(Math.random() * 10) - 5; // Random offset close to Fibonacci numbers
    const candidate = randomFib + offset;
    if (!fibNumbers.includes(candidate) && candidate > 0 && !nonFib.includes(candidate)) {
      nonFib.push(candidate);
    }
  }
  return nonFib;
}

// Function to create number elements (static and non-overlapping)
function createNumberElement(number, isFib = true, usedPositions) {
  const numberElement = document.createElement('div');
  numberElement.classList.add('number');
  numberElement.textContent = number;

  const size = isFib ? (50 + Math.random() * 50) : (30 + Math.random() * 30);
  numberElement.style.width = `${size}px`;
  numberElement.style.height = numberElement.style.width;

  let validPosition = false;
  let x, y;

  // Find a position that doesn't overlap with others
  while (!validPosition) {
    x = Math.random() * 80; // 80% width of the game board
    y = Math.random() * 80; // 80% height of the game board
    validPosition = !usedPositions.some(pos => {
      const dx = pos.x - x;
      const dy = pos.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 10; // Minimum distance of 10% to avoid overlap
    });
  }

  numberElement.style.position = 'absolute';
  numberElement.style.left = `${x}%`;
  numberElement.style.top = `${y}%`;
  usedPositions.push({ x, y }); // Save the position

  return numberElement;
}

// Function to display Fibonacci and distractor numbers
function displayNumbers() {
  const fibNumbers = currentSequence;
  const difficulty = difficultySelect.value;
  const distractors = generateNonFibonacciNumbers(difficultySettings[difficulty].distractors, fibNumbers);
  const usedPositions = [];

  // Clear any existing numbers
  gameBoard.innerHTML = '';

  // Generate Fibonacci numbers
  fibNumbers.forEach((number) => {
    const element = createNumberElement(number, true, usedPositions);
    element.addEventListener('click', () => handleNumberClick(number, element));
    gameBoard.appendChild(element);
  });

  // Generate distractor numbers
  distractors.forEach((number) => {
    const element = createNumberElement(number, false, usedPositions);
    gameBoard.appendChild(element);
  });
}

// Handle click on numbers
function handleNumberClick(number, element) {
  if (!gameActive) return;

  if (number === currentSequence[correctFibIndex]) {
    clickedNumbers.push(number);
    correctFibIndex++;
    correctSound.currentTime = 0;
    correctSound.play();
    correctSequenceDisplay.textContent = `Correct Sequence: ${clickedNumbers.join(', ')}`;
    gameBoard.removeChild(element);

    if (clickedNumbers.length === currentSequence.length) {
      gameActive = false;
      clearInterval(timerInterval);
      levelUpSound.play();
      setTimeout(() => nextLevel(), 1000);
    }
  } else {
    incorrectSound.currentTime = 0;
    incorrectSound.play();
    messageDisplay.textContent = "Incorrect, try again!";
  }
}

// Move to the next level
function nextLevel() {
  addToLeaderboard(level, timeLeft);
  level++;
  levelDisplay.textContent = `Level: ${level}`;
  clickedNumbers = [];
  correctFibIndex = 0;
  const difficulty = difficultySelect.value;
  timeLeft = difficultySettings[difficulty].time;

  // Randomize starting Fibonacci numbers for the sequence
  startFromIndex = Math.floor(Math.random() * 10) + 3; // Randomize between index 3 and 12
  currentSequence = generateFibonacciSequence(level, startFromIndex);

  gameActive = true;
  correctSequenceDisplay.textContent = `Correct Sequence: ${currentSequence[0]}, ${currentSequence[1]}`;
  displayNumbers();
  resetTimer();
}

// Timer functions
function startTimer() {
  timerDisplay.textContent = `Time: ${timeLeft}s`;
  timerInterval = setInterval(() => {
    if (!gameActive || gamePaused) return;
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  startTimer();
}

// Handle Pause/Resume Button
pauseButton.addEventListener('click', () => {
  if (!gameActive) return;
  if (gamePaused) {
    gamePaused = false;
    pauseButton.textContent = "Pause";
    resetTimer();
  } else {
    gamePaused = true;
    pauseButton.textContent = "Resume";
    clearInterval(timerInterval);
  }
});

// Handle Difficulty Change
difficultySelect.addEventListener('change', () => {
  const difficulty = difficultySelect.value;
  timeLeft = difficultySettings[difficulty].time;
  if (gameActive && !gamePaused) {
    resetTimer();
  }
});

// Handle game end
function endGame() {
  gameActive = false;
  messageDisplay.textContent = "Time's up! Game Over.";
  restartButton.style.display = "block"; // Show the restart button
}

// Handle restart button click
restartButton.addEventListener('click', () => {
  restartButton.style.display = "none";
  startGame(true);
  updateLeaderboard();
});

// Start the game
function startGame(isRestart = false) {
  // Reset level and other state variables
  level = 1;
  const difficulty = difficultySelect.value;
  timeLeft = difficultySettings[difficulty].time;
  clickedNumbers = [];
  correctFibIndex = 0;
  gameActive = true;

  // Randomize the Fibonacci sequence's start index and generate a new sequence
  startFromIndex = Math.floor(Math.random() * 10) + 3; // Randomize starting point
  currentSequence = generateFibonacciSequence(level, startFromIndex);

  correctSequenceDisplay.textContent = `Correct Sequence: ${currentSequence[0]}, ${currentSequence[1]}`;
  displayNumbers();
  
  if (isRestart) {
    resetTimer();
  }

  if (!isRestart) {
    addToLeaderboard(level, timeLeft);
  }
}

startGame();
