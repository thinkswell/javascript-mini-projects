// js/app.js
import { Game } from './Game.js';
import { UI } from './UI.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize game with a 30-second duration
  const game = new Game(30);
  
  // Bind UI to the game instance
  const ui = new UI(game);
});
