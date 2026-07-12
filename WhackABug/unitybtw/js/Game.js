// js/Game.js

export class Game {
  constructor(duration = 30) {
    this.initialDuration = duration;
    this.score = 0;
    this.timeLeft = duration;
    this.isPlaying = false;
    this.activeHoleIndex = null;
    this.timerId = null;
    this.moleTimerId = null;
    
    // Callbacks to be hooked by UI
    this.onScoreUpdate = () => {};
    this.onTimeUpdate = () => {};
    this.onMoleSpawn = () => {};
    this.onMoleHide = () => {};
    this.onGameOver = () => {};
  }

  start() {
    this.score = 0;
    this.timeLeft = this.initialDuration;
    this.isPlaying = true;
    
    this.onScoreUpdate(this.score);
    this.onTimeUpdate(this.timeLeft);
    
    this.tick();
    this.spawnMole();
  }

  stop() {
    this.isPlaying = false;
    clearTimeout(this.timerId);
    clearTimeout(this.moleTimerId);
    if (this.activeHoleIndex !== null) {
      this.onMoleHide(this.activeHoleIndex);
      this.activeHoleIndex = null;
    }
    this.onGameOver(this.score);
  }

  tick() {
    this.timerId = setTimeout(() => {
      this.timeLeft--;
      this.onTimeUpdate(this.timeLeft);
      
      if (this.timeLeft <= 0) {
        this.stop();
      } else {
        this.tick();
      }
    }, 1000);
  }

  spawnMole() {
    if (!this.isPlaying) return;

    // Hide previous mole if any
    if (this.activeHoleIndex !== null) {
      this.onMoleHide(this.activeHoleIndex);
    }

    // Pick a random hole different from the last one
    let newHole;
    do {
      newHole = Math.floor(Math.random() * 9);
    } while (newHole === this.activeHoleIndex);

    this.activeHoleIndex = newHole;
    this.onMoleSpawn(this.activeHoleIndex);

    // Random time between 500ms and 1500ms
    const timeToWait = Math.random() * 1000 + 500;
    
    this.moleTimerId = setTimeout(() => {
      this.spawnMole();
    }, timeToWait);
  }

  whack(holeIndex) {
    if (!this.isPlaying) return false;
    
    if (holeIndex === this.activeHoleIndex) {
      this.score++;
      this.onScoreUpdate(this.score);
      
      // Hide the mole immediately after whacking
      this.onMoleHide(this.activeHoleIndex);
      this.activeHoleIndex = null;
      
      // Clear current mole timer and spawn a new one faster
      clearTimeout(this.moleTimerId);
      this.moleTimerId = setTimeout(() => {
        this.spawnMole();
      }, 300);
      
      return true; // Whack successful
    }
    return false; // Whack missed
  }
}
