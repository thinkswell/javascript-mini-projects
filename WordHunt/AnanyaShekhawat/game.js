const GRID_SIZE = 4;
const MIN_WORD_LENGTH = 3;

let grid = [];
let selectedCells = [];
let foundWords = new Set();
let score = 0;
let startTime = Date.now();
let timerInterval;
let gameTimeLimit = 180;
let timeRemaining = gameTimeLimit;
let gameActive = true;
let canvas = null;
let ctx = null;

function generateGrid() {
    const commonVowels = 'AAAAAEEEEEEIIIIOOOUUU';
    const commonConsonants = 'TTTTNNNSSSSRRRLLLDDDBBCCMMPPPHHGGFWWKKKVJ';
    const uncommonLetters = 'XYZQ';
    
    const letters = [];
    
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        let letter;
        const rand = Math.random();
        
        if (rand < 0.30) {
            letter = commonVowels[Math.floor(Math.random() * commonVowels.length)];
        } else if (rand < 0.95) {
            letter = commonConsonants[Math.floor(Math.random() * commonConsonants.length)];
        } else {
            letter = uncommonLetters[Math.floor(Math.random() * uncommonLetters.length)];
        }
        
        letters.push(letter);
    }
    
    // have to shffle letters
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    
    return letters;
}

function createGrid() {
    grid = generateGrid();
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    
    canvas = document.getElementById('connectionCanvas');
    const gridContainer = document.querySelector('.grid-container');
    canvas.width = gridContainer.offsetWidth;
    canvas.height = gridContainer.offsetHeight;
    ctx = canvas.getContext('2d');
    
    grid.forEach((letter, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = letter;
        cell.dataset.index = index;
        cell.addEventListener('mousedown', startSelection);
        cell.addEventListener('mouseenter', continueSelection);
        cell.addEventListener('mouseup', endSelection);
        gridElement.appendChild(cell);
    });
}

function drawConnections() {
    if (!ctx || selectedCells.length < 2) {
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const cells = document.querySelectorAll('.cell');
    // const gridRect = document.getElementById('grid').getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(26, 95, 63, 0.6)';
    ctx.shadowBlur = 15;
    
    selectedCells.forEach((cellIndex, i) => {
        const cell = cells[cellIndex];
        const cellRect = cell.getBoundingClientRect();
        
        const x = cellRect.left - canvasRect.left + cellRect.width / 2;
        const y = cellRect.top - canvasRect.top + cellRect.height / 2;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    ctx.shadowBlur = 8;
    selectedCells.forEach(cellIndex => {
        const cell = cells[cellIndex];
        const cellRect = cell.getBoundingClientRect();
        
        const x = cellRect.left - canvasRect.left + cellRect.width / 2;
        const y = cellRect.top - canvasRect.top + cellRect.height / 2;
        
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(26, 95, 63, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function startSelection(e) {
    e.preventDefault();
    selectedCells = [parseInt(e.target.dataset.index)];
    updateDisplay();
}

function continueSelection(e) {
    if (e.buttons !== 1) return;
    
    const index = parseInt(e.target.dataset.index);
    
    if (selectedCells.includes(index)) return;
    
    const lastIndex = selectedCells[selectedCells.length - 1];
    if (isAdjacent(lastIndex, index)) {
        selectedCells.push(index);
        updateDisplay();
    }
}

function endSelection() {
    checkWord();
}

function isAdjacent(index1, index2) {
    const row1 = Math.floor(index1 / GRID_SIZE);
    const col1 = index1 % GRID_SIZE;
    const row2 = Math.floor(index2 / GRID_SIZE);
    const col2 = index2 % GRID_SIZE;
    
    return Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1;
}

function getCurrentWord() {
    return selectedCells.map(i => grid[i]).join('');
}

function updateDisplay() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        if (selectedCells.includes(index)) {
            cell.classList.add('selected');
        } else {
            cell.classList.remove('selected');
        }
    });
    
    document.getElementById('currentWord').textContent = getCurrentWord();
    drawConnections();
}

function checkWord() {
    if (!gameActive) return;
    
    const word = getCurrentWord().toLowerCase();
    const messageEl = document.getElementById('message');
    
    if (word.length < MIN_WORD_LENGTH) {
        messageEl.textContent = 'Word too short!';
        messageEl.className = 'message error';
        setTimeout(() => messageEl.textContent = '', 2000);
        clearSelection();
        return;
    }
    
    if (foundWords.has(word)) {
        messageEl.textContent = 'Already found!';
        messageEl.className = 'message error';
        setTimeout(() => messageEl.textContent = '', 2000);
        clearSelection();
        return;
    }
    
    messageEl.textContent = 'Checking...';
    messageEl.className = 'message';
    
    validateWordWithAPI(word);
}

async function validateWordWithAPI(word) {
    const messageEl = document.getElementById('message');
    
    try {
        const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
        const response = await fetch(url);
        
        if (response.ok) {
            const data = await response.json();
            
            if (data && data.length > 0) {
                foundWords.add(word);
                
                const wordLength = word.length;
                let points;
                if (wordLength === 3) {
                    points = 10;
                } else if (wordLength === 4) {
                    points = 20;
                } else if (wordLength === 5) {
                    points = 40;
                } else if (wordLength === 6) {
                    points = 60;
                } else if (wordLength === 7) {
                    points = 100;
                } else {
                    points = wordLength * 20;
                }
                
                score += points;
                
                selectedCells.forEach(index => {
                    const cell = document.querySelector('[data-index="' + index + '"]');
                    cell.classList.add('found');
                    setTimeout(() => {
                        cell.classList.remove('found');
                    }, 500);
                });
                
                messageEl.textContent = 'Great! +' + points + ' points (' + wordLength + ' letters)';
                messageEl.className = 'message success';
                setTimeout(() => messageEl.textContent = '', 2000);
                
                updateFoundWords();
                updateScore();
            } else {
                messageEl.textContent = 'Not a valid word';
                messageEl.className = 'message error';
                setTimeout(() => messageEl.textContent = '', 2000);
            }
        } else {
            messageEl.textContent = 'Not a valid word';
            messageEl.className = 'message error';
            setTimeout(() => messageEl.textContent = '', 2000);
        }
    } catch (error) {
        console.error('Error validating word:', error);
        messageEl.textContent = 'Error checking word - API unavailable';
        messageEl.className = 'message error';
        setTimeout(() => messageEl.textContent = '', 3000);
    }
    
    clearSelection();
}

function clearSelection() {
    selectedCells = [];
    updateDisplay();
}

function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('wordsFound').textContent = foundWords.size;
}

function updateFoundWords() {
    const wordsArray = Array.from(foundWords).sort();
    document.getElementById('foundWords').innerHTML = 
        wordsArray.map(word => '<span class="found-word">' + word.toUpperCase() + '</span>').join('');
}

function updateTimer() {
    if (gameTimeLimit === -1) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const secondsStr = seconds.toString().padStart(2, '0');
        document.getElementById('timer').textContent = minutes + ':' + secondsStr;
    } else {
        timeRemaining--;
        
        if (timeRemaining <= 0) {
            timeRemaining = 0;
            gameActive = false;
            clearInterval(timerInterval);
            endGame();
        }
        
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        const secondsStr = seconds.toString().padStart(2, '0');
        document.getElementById('timer').textContent = minutes + ':' + secondsStr;
        
        if (timeRemaining <= 10) {
            document.getElementById('timer').style.color = '#ff6b6b';
        } else {
            document.getElementById('timer').style.color = '#ffffff';
        }
    }
}

function endGame() {
    const messageEl = document.getElementById('message');
    messageEl.textContent = 'Time\'s up! Final Score: ' + score + ' points';
    messageEl.className = 'message success';
    
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.cursor = 'not-allowed';
        cell.style.opacity = '0.6';
    });
}

function setTimerMode(seconds) {
    gameTimeLimit = seconds;
    
    const timerButtons = document.querySelectorAll('.timer-btn');
    timerButtons.forEach(btn => btn.classList.remove('active'));
    
    if (seconds === 60) {
        document.getElementById('timer1min').classList.add('active');
    } else if (seconds === 180) {
        document.getElementById('timer3min').classList.add('active');
    } else if (seconds === 300) {
        document.getElementById('timer5min').classList.add('active');
    } else {
        document.getElementById('timerUnlimited').classList.add('active');
    }
    
    newGame();
}

function newGame() {
    selectedCells = [];
    foundWords = new Set();
    score = 0;
    startTime = Date.now();
    timeRemaining = gameTimeLimit;
    gameActive = true;
    
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.cursor = 'pointer';
        cell.style.opacity = '1';
    });
    
    createGrid();
    updateScore();
    updateFoundWords();
    document.getElementById('currentWord').textContent = '';
    document.getElementById('message').textContent = '';
    document.getElementById('timer').style.color = '#ffffff';
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

document.addEventListener('dragstart', e => e.preventDefault());

(function() {
    newGame();
    
    document.getElementById('clearBtn').addEventListener('click', clearSelection);
    document.getElementById('newGameBtn').addEventListener('click', newGame);
    
    document.getElementById('timer1min').addEventListener('click', () => setTimerMode(60));
    document.getElementById('timer3min').addEventListener('click', () => setTimerMode(180));
    document.getElementById('timer5min').addEventListener('click', () => setTimerMode(300));
    document.getElementById('timerUnlimited').addEventListener('click', () => setTimerMode(-1));
})();