import _ from 'lodash'

import { PLAYING, STOPPED } from '../constants/gameStatus'
import { WELL_COL, WELL_ROW, DROP_INTERVAL_DEFAULT } from '../constants/options'
import { TETROMINOS, SHAPES } from '../constants/tetromino'

export function generateEmptyWellGrid(row = WELL_ROW, col = WELL_COL) {
  return _.times(row, () => {
    return _.times(col, () => null)
  })
}

export function getRandomTetromino() {
  const rand = Math.floor(Math.random() * TETROMINOS.length)
  return TETROMINOS[rand]
}

export function generateInitState(isPlaying = false) {
  const hasntStartedState = {
    gameStatus: STOPPED,
    score: 0,
    linesCleared: 0
  }

  const currTetromino = getRandomTetromino()
  const currTetroGrid = SHAPES[currTetromino]

  return isPlaying === false ?
    hasntStartedState : _.assign({}, hasntStartedState, {
      gameStatus: PLAYING,
      grid: generateEmptyWellGrid(),
      nextTetromino: getRandomTetromino(),
      currTetromino,
      currTetroGrid,
      currTetroPosition: getInitTetroPosition(currTetroGrid),
      dropInterval: DROP_INTERVAL_DEFAULT,
      isAccelerating: false
    })
}

export function createEmptyLine(col = WELL_COL) {
  return _.times(col, () => null)
}

// todo: the init 'y' should be calculated with the 
// current position of the tetromino of different shapes(rotate)
export function getInitTetroPosition(currTetroGrid, col = WELL_COL) {
  return {
    // 'x' is the left-top point of the shape
    // to make it align center, we also need to minus half width of the tetromino
    x: Math.round(col / 2) - Math.round(currTetroGrid[0].length / 2), 
    y: -2
  }
}

export function isPositionAvailable(grid, currTetroGrid, newPosition) {
  // determine whether if the tetromino crosses the wall
  // or overlaps others

  // note that the single block is at the right bottom side of (x,y)
  // which is why we use '>' and sometimes '>=' instead

  const wellRow = grid.length
  const wellCol = grid[0].length
  const rows = currTetroGrid.length
  const cols = currTetroGrid[0].length

  let relativeX
  let relativeY

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // skip this loop if the current block is blank
      if (!currTetroGrid[row][col]) continue

      relativeX = newPosition.x + col
      relativeY = newPosition.y + row

      // boundary check
      if (relativeX < 0 || relativeX >= wellCol || relativeY >= wellRow) {
        return false
      }

      // overlap check
      if (relativeY >= 0 && grid[relativeY][relativeX]) {
        return false
      }
    }
  }
  return true
}

export function rotate(currTetroGrid) {
  // rotate 90 degree clockwise: https://stackoverflow.com/questions/42519/how-do-you-rotate-a-two-dimensional-array
  // 1. transpose 2. reverse each row
  const rows = currTetroGrid.length
  const cols = currTetroGrid[0].length

  let grid = _.times(cols, () => [])
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      grid[col][row] = currTetroGrid[row][col]
    }
  }
  return grid.map(r => r.reverse())
}

export function fitTetrominoWithinBoundaries(
  grid,
  tetrominoGrid,
  { x, y }
) {
  // adjust the horizontal position of the tetromino if the rotation makes it out of the boundary
  const cols = grid[0].length
  let relativeX
  let newX = x

  for (let row = 0; row < tetrominoGrid.length; row++) {
    for (let col = 0; col < tetrominoGrid[0].length; col++) {
      if (!tetrominoGrid[row][col]) continue
      relativeX = newX + col

      // todo: I dont think the tetro is able to cross the left boundary?? 

      // if (relativeX < 0) {
      //   // newX = 0
      //   newX++
      // } 
      if (relativeX >= cols) {
        // newX -= relativeX - cols + 1
        newX--
      }
    }
  }

  return { x: newX, y }
}

export function hasLineToClear(grid) {
  return grid.some(row => {
    return row.every(el => el !== null)
  })
}

export function clearLines(grid) {
  const emptyRow = _.times(grid[0].length, () => null)
  
  return grid.reduce((result, row) => {
    if (!row.every(el => el !== null)) {
      result.push([...row])
    } else {
      result.unshift(emptyRow)
    }
    return result
  }, [])
}

export function transferTetroGridIntoWell({ grid, tetroGrid, tetroPosition, color }) {
  let newGrid = grid.map(row => row.map(col => col))
  
  let relativeX, relativeY

  for (let row = 0; row < tetroGrid.length; row++) {
    for (let col = 0; col < tetroGrid[0].length; col++) {
      if (!tetroGrid[row][col]) continue
      relativeX = tetroPosition.x + col
      relativeY = tetroPosition.y + row

      newGrid[relativeY][relativeX] = color
    }
  }
  return newGrid
}

export function setDropTimeout(cb, interval) {
  clearDropTimeout()
  window.dropTimer = setTimeout(cb, interval)
}

// bad
export function clearDropTimeout() {
  if (!window.dropTimer)  return
  clearTimeout(window.dropTimer)
  window.dropTimer = null
}
