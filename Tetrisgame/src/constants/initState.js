// the initial state tree object

import { STOPPED } from './gameStatus'
import { generateEmptyWellGrid, getRandomTetrimino } from '../utils'

export const newGame = {
  gameStatus: STOPPED,
  score: 0,
  linesCleared: 0
  // grid: generateEmptyWellGrid(),
  // nextTetromino: 'I',
  // currTetromino: getRandomTetrimino(),
  // currTetroGrid: [
  //   [ 0, 0, 0, 0 ],
  //   [ 1, 1, 1, 1 ],
  //   [ 0, 0, 0, 0 ],
  //   [ 0, 0, 0, 0 ]
  // ],
  // currTetroPosition: {
  //   "x": 3,
  //   "y": 6
  // },
  // dropInterval: 48,
  // isAccelerating: false
}