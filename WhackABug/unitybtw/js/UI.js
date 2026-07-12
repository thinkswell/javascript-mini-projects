// js/UI.js

export class UI {
  constructor(gameInstance) {
    this.game = gameInstance;
    
    // DOM Elements
    this.scoreElement = document.getElementById('score');
    this.timeElement = document.getElementById('time');
    this.startBtn = document.getElementById('start-btn');
    this.holes = document.querySelectorAll('.hole');
    this.modal = document.getElementById('game-over-modal');
    this.finalScoreElement = document.getElementById('final-score');
    this.restartBtn = document.getElementById('restart-btn');

    this.bindEvents();
    this.bindGameHooks();
  }

  bindEvents() {
    this.startBtn.addEventListener('click', () => {
      this.game.start();
      this.startBtn.disabled = true;
      this.startBtn.textContent = 'DEBUGGING...';
    });

    this.restartBtn.addEventListener('click', () => {
      this.modal.removeAttribute('open');
      this.game.start();
    });

    this.holes.forEach((hole) => {
      hole.addEventListener('click', (e) => {
        // Prevent cheating by triggering click events via JS without user interaction
        if (!e.isTrusted) return; 

        const index = parseInt(hole.dataset.index, 10);
        const isWhacked = this.game.whack(index);
        
        if (isWhacked) {
          hole.classList.add('hole--whacked');
          // Provide sound feedback if desired here
          setTimeout(() => {
            hole.classList.remove('hole--whacked');
          }, 150); // Fast animation duration
        }
      });
    });
  }

  bindGameHooks() {
    this.game.onScoreUpdate = (score) => {
      this.scoreElement.textContent = score;
    };

    this.game.onTimeUpdate = (time) => {
      this.timeElement.textContent = time;
    };

    this.game.onMoleSpawn = (index) => {
      this.holes[index].classList.add('hole--active');
    };

    this.game.onMoleHide = (index) => {
      this.holes[index].classList.remove('hole--active');
      this.holes[index].classList.remove('hole--whacked');
    };

    this.game.onGameOver = (finalScore) => {
      this.startBtn.disabled = false;
      this.startBtn.textContent = 'START DEBUGGING';
      this.finalScoreElement.textContent = finalScore;
      this.modal.setAttribute('open', '');
    };
  }
}
