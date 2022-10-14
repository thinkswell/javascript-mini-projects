console.log( window.location );

import { LEVEL, OBJECT_TYPE } from './setup.js';
import { randomMovement } from './lib/ghostmoves.js';
// Classes
import GameBoard from './lib/GameBoard.js';
import Pacman from './lib/Pacman.js';
import Ghost from './lib/Ghost.js';


// Dom Elements
const gameGrid = document.querySelector( '#game' );
const scoreTable = document.querySelector( '#score' );
const startButton = document.querySelector( '#start-button' );
// Game constants
const POWER_PILL_TIME = 10000; // ms
const GLOBAL_SPEED = 80; // ms
const gameBoard = GameBoard.createGameBoard( gameGrid, LEVEL );
// Initial setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

// --- GAME CONTROLLER --- //
const gameOver = ( pacman, grid ) => {
  document.removeEventListener( 'keydown', ( e ) =>
    pacman.handleKeyInput( e, gameBoard.objectExist.bind( gameBoard ) )
  );

  gameBoard.showGameStatus( gameWin );

  clearInterval( timer );
  // Show startbutton
  startButton.classList.remove( 'hide' );
}

const checkCollision = ( pacman, ghosts ) => {
  const collidedGhost = ghosts.find( ( ghost ) => pacman.pos === ghost.pos );

  if ( collidedGhost ) {
    if ( pacman.powerPill ) {
      gameBoard.removeObject( collidedGhost.pos, [
        OBJECT_TYPE.GHOST,
        OBJECT_TYPE.SCARED,
        collidedGhost.name
      ] );
      collidedGhost.pos = collidedGhost.startPos;
      score += 100;
    } else {
      gameBoard.removeObject( pacman.pos, [ OBJECT_TYPE.PACMAN ] );
      gameBoard.rotateDiv( pacman.pos, 0 );
      gameOver( pacman, gameGrid );
    }
  }
}

const gameLoop = ( pacman, ghosts ) => {
  // 1. Move Pacman
  gameBoard.moveCharacter( pacman );
  // 2. Check Ghost collision on the old positions
  checkCollision( pacman, ghosts );
  // 3. Move ghosts
  ghosts.forEach( ( ghost ) => gameBoard.moveCharacter( ghost ) );
  // 4. Do a new ghost collision check on the new positions
  checkCollision( pacman, ghosts );
  // 5. Check if Pacman eats a dot
  if ( gameBoard.objectExist( pacman.pos, OBJECT_TYPE.DOT ) ) {

    gameBoard.removeObject( pacman.pos, [ OBJECT_TYPE.DOT ] );
    // Remove a dot
    gameBoard.dotCount--;
    // Add Score
    score += 10;
  }
  // 6. Check if Pacman eats a power pill
  if ( gameBoard.objectExist( pacman.pos, OBJECT_TYPE.PILL ) ) {

    gameBoard.removeObject( pacman.pos, [ OBJECT_TYPE.PILL ] );

    pacman.powerPill = true;
    score += 50;

    clearTimeout( powerPillTimer );
    powerPillTimer = setTimeout(
      () => ( pacman.powerPill = false ),
      POWER_PILL_TIME
    );
  }
  // 7. Change ghost scare mode depending on powerpill
  if ( pacman.powerPill !== powerPillActive ) {
    powerPillActive = pacman.powerPill;
    ghosts.forEach( ( ghost ) => ( ghost.isScared = pacman.powerPill ) );
  }
  // 8. Check if all dots have been eaten
  if ( gameBoard.dotCount === 0 ) {
    gameWin = true;
    gameOver( pacman, gameGrid );
  }
  // 9. Show new score
  scoreTable.innerHTML = score;
}

const startGame = () => {
  gameWin = false;
  powerPillActive = false;
  score = 0;

  startButton.classList.add( 'hide' );

  gameBoard.createGrid( LEVEL );

  const pacman = new Pacman( 2, 287 );
  gameBoard.addObject( 287, [ OBJECT_TYPE.PACMAN ] );
  document.addEventListener( 'keydown', ( e ) =>
    pacman.handleKeyInput( e, gameBoard.objectExist.bind( gameBoard ) )
  );

  const ghosts = [
    new Ghost( 2, 251, randomMovement, OBJECT_TYPE.CLYDE ),
    new Ghost( 3, 230, randomMovement, OBJECT_TYPE.INKY ),
    new Ghost( 4, 209, randomMovement, OBJECT_TYPE.PINKY ),
    new Ghost( 5, 188, randomMovement, OBJECT_TYPE.BLINKY )
  ];

  // Gameloop
  timer = setInterval( () => gameLoop( pacman, ghosts ), GLOBAL_SPEED );
}

// Initialize game
startButton.addEventListener( 'click', startGame );
