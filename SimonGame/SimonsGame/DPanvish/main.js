// Simple Simon's Game - Super Easy Version

// Game variables
let sequence = [];
let playerSequence = [];
let score = 0;
let level = 1;
let isPlaying = false;
let speed = 1000;
let audioContext = null;

// Colors
let colors = ['red', 'blue', 'green', 'yellow'];

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupGame();
});

// Setup the game
function setupGame() {
    // Setup buttons
    document.getElementById('startBtn').onclick = startGame;
    document.getElementById('endlessBtn').onclick = startEndlessMode;
    document.getElementById('resetBtn').onclick = resetGame;
    
    // Setup color buttons
    colors.forEach(function(color) {
        document.getElementById(color).onclick = function() {
            handleClick(color);
        };
    });
    
    // Initialize audio context on first user interaction
    document.addEventListener('click', initAudio, { once: true });
    
    // Setup audio volume
    setVolume(0.5); // Set default volume to 50%
    
    updateDisplay();
}

// Initialize audio context
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('Audio initialized successfully');
        
        // Set up periodic audio health check
        setInterval(checkAudioHealth, 5000); // Check every 5 seconds
        
    } catch (error) {
        console.log('Audio not supported');
        audioContext = null;
    }
}

// Check and fix audio context health
function checkAudioHealth() {
    if (audioContext && audioContext.state === 'suspended') {
        console.log('Audio context suspended, attempting to resume...');
        audioContext.resume().catch(function(error) {
            console.log('Failed to resume audio context, recreating...');
            audioContext = null;
        });
    }
}



// Start classic game
function startGame() {
    resetGame();
    isPlaying = true;
    document.getElementById('mode').textContent = 'Classic';
    hideStartButtons();
    showPattern();
}

// Start endless mode
function startEndlessMode() {
    resetGame();
    isPlaying = true;
    document.getElementById('mode').textContent = 'Endless';
    hideStartButtons();
    showPattern();
}

// Reset game
function resetGame() {
    sequence = [];
    playerSequence = [];
    score = 0;
    level = 1;
    isPlaying = false;
    
    document.getElementById('gameStatus').textContent = 'Press Start';
    showStartButtons();
    updateDisplay();
}

// Add new color to sequence
function addToSequence() {
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
}

// Show pattern to player
function showPattern() {
    document.getElementById('gameStatus').textContent = 'Watch the pattern...';
    
    // Quick audio test before showing pattern
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().then(function() {
            console.log('Audio resumed before pattern');
            startPattern();
        }).catch(function() {
            console.log('Audio resume failed, recreating context');
            audioContext = null;
            startPattern();
        });
    } else {
        startPattern();
    }
    
    function startPattern() {
        // Add new color
        addToSequence();
        
        // Show each color
        let i = 0;
        function showNext() {
            if (i < sequence.length) {
                flashColor(sequence[i]);
                i++;
                setTimeout(showNext, speed);
            } else {
                // Pattern complete, player's turn
                document.getElementById('gameStatus').textContent = 'Your turn!';
                playerSequence = [];
            }
        }
        showNext();
    }
}

// Flash a color button
function flashColor(color) {
    let button = document.getElementById(color);
    let soundIndex = colors.indexOf(color) + 1;
    let sound = document.getElementById('sound' + soundIndex);
    
    // Activate button
    button.classList.add('active');
    playSound(sound, color);
    
    // Deactivate after delay
    setTimeout(function() {
        button.classList.remove('active');
    }, speed / 2);
}

// Handle player click
function handleClick(color) {
    if (!isPlaying) return;
    
    playerSequence.push(color);
    flashColor(color);
    
    // Check if correct
    let currentIndex = playerSequence.length - 1;
    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
        gameOver();
        return;
    }
    
    // Check if level complete
    if (playerSequence.length === sequence.length) {
        levelComplete();
    }
}

// Level complete
function levelComplete() {
    score += level * 10;
    level++;
    
    document.getElementById('gameStatus').textContent = 'Level Complete!';
    updateDisplay();
    
    // Continue to next level
    setTimeout(function() {
        if (isPlaying) {
            showPattern();
        }
    }, 1000);
}

// Game over
function gameOver() {
    isPlaying = false;
    
    // Play game over sound
    let gameOverSound = document.getElementById('gameOverSound');
    playSound(gameOverSound, 'gameOver');
    
    // Show final score
    document.getElementById('gameStatus').textContent = 'Game Over! Score: ' + score;
    showStartButtons();
    
    // Show alert
    setTimeout(function() {
        alert('Game Over!\n\nFinal Score: ' + score + '\nLevel Reached: ' + (level - 1) + '\n\nGreat job! Try again!');
    }, 500);
}

// Play sound with fallback
function playSound(audio, color) {
    // Always try to play tone first (more reliable)
    playColorTone(color);
    
    // Also try to play audio file if available
    if (audio && audio.src) {
        audio.currentTime = 0;
        audio.volume = 0.3; // Lower volume so it doesn't conflict with tone
        audio.play().catch(function(e) {
            // Ignore errors - tone is already playing
        });
    }
}

// Play different tones for each color
function playColorTone(color) {
    // Make sure audio context is initialized and working
    if (!audioContext || audioContext.state === 'closed') {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('Audio context recreated');
        } catch (error) {
            console.log('Audio not supported');
            return;
        }
    }
    
    try {
        // Resume audio context if it's suspended
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(function() {
                console.log('Audio context resumed');
                playTone(color);
            }).catch(function(error) {
                console.log('Failed to resume audio context:', error);
                // Try to recreate audio context
                audioContext = null;
                playColorTone(color);
            });
            return;
        }
        
        playTone(color);
        
    } catch (error) {
        console.log('Error in playColorTone:', error);
        // Try to recreate audio context
        audioContext = null;
        playColorTone(color);
    }
}

// Helper function to actually play the tone
function playTone(color) {
    try {
        let oscillator = audioContext.createOscillator();
        let gainNode = audioContext.createGain();
        
        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Set different frequency for each color
        let frequency = 440; // Default
        switch(color) {
            case 'red': frequency = 523; break;    // C note
            case 'blue': frequency = 587; break;   // D note
            case 'green': frequency = 659; break;  // E note
            case 'yellow': frequency = 698; break; // F note
            default: frequency = 220; break;       // Low A (for game over)
        }
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        // Set volume and fade out
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        // Play sound
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        
        console.log('Playing ' + color + ' tone at ' + frequency + 'Hz');
        
    } catch (error) {
        console.log('Error playing tone:', error);
    }
}

// Set volume
function setVolume(volume) {
    colors.forEach(function(color, index) {
        let audio = document.getElementById('sound' + (index + 1));
        if (audio) {
            audio.volume = volume;
        }
    });
    
    let gameOverSound = document.getElementById('gameOverSound');
    if (gameOverSound) {
        gameOverSound.volume = volume;
    }
}

// Update display
function updateDisplay() {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
}

// Hide start buttons
function hideStartButtons() {
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('endlessBtn').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'inline-block';
}

// Show start buttons
function showStartButtons() {
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('endlessBtn').style.display = 'inline-block';
    document.getElementById('resetBtn').style.display = 'none';
}
