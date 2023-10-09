import _ from 'lodash'
import {
  GAME_INIT, GAME_START, GAME_PAUSE, GAME_RESUME,
  MOVE, ROTATE, DROP,
  ENABLE_ACCELERATE, DISABLE_ACCELERATE
} from '../constants/actionTypes'
import { PLAYING, PAUSING, STOPPED } from '../constants/gameStatus'

import {
  getRandomTetromino, getInitTetroPosition,
  isPositionAvailable, rotate, fitTetrominoWithinBoundaries,
  generateInitState, hasLineToClear, clearLines,
  transferTetroGridIntoWell,
  clearDropTimeout
} from '../utils'
import { getTetrisStateFromStorage, updateTetrisStateStorage } from '../utils/storage'
import { SHAPES, COLORS } from '../constants/tetromino'
import { DROP_INTERVAL_DEC, DROP_INTERVAL_MIN } from '../constants/options'

export default function root(state = {}, action) {
  let {
    score,
    linesCleared,
    grid,
    nextTetromino,
    currTetroGrid,
    currTetromino,
    currTetroPosition,
    dropInterval
  } = state

  let newPosition
  
  switch(action.type) {
    // the grid of the well is static, and it doesn't
    // count the current dropping tetromino
    case GAME_INIT:
      return getTetrisStateFromStorage() || generateInitState()
    case GAME_START:
      return generateInitState(true)
    case GAME_PAUSE:
      return _.assign({}, state, { gameStatus: PAUSING })
    case GAME_RESUME:
      return _.assign({}, state, { gameStatus: PLAYING })
    case MOVE:
      // horizontal move
      newPosition = {
        x: currTetroPosition.x + action.payload,
        y: currTetroPosition.y
      }

      if (!isPositionAvailable(grid, currTetroGrid, newPosition)) return state
      
      return _.assign({}, state, {
        currTetroPosition: newPosition
      })
    case ROTATE:
      if (currTetromino === 'O')  return state
      const newTetroGrid = rotate(currTetroGrid)
      newPosition = fitTetrominoWithinBoundaries(grid, newTetroGrid, currTetroPosition)
    
      if (!isPositionAvailable(grid, newTetroGrid, newPosition))  return state
      
      else return _.assign({}, state, {
        currTetroGrid: newTetroGrid,
        currTetroPosition: newPosition
      })
    case DROP:
      // get the newPosition 
      newPosition = _.assign({}, currTetroPosition, {
        y: currTetroPosition.y + 1
      })

      // drop until it hits something
      if (isPositionAvailable(grid, currTetroGrid, newPosition)) {
        return updateTetrisStateStorage(_.assign({}, state, { currTetroPosition: newPosition }))
      }
      
      // position is not available => reaches the bottom-most position of the well
      
      // there is no extra room for the new tetromino, game over
      if (currTetroPosition.y < 0) {
        clearDropTimeout()
        updateTetrisStateStorage(null)
        return _.assign({}, state, { gameStatus: STOPPED })
      }
      
      let newGrid = transferTetroGridIntoWell({
        grid,
        tetroGrid: currTetroGrid,
        tetroPosition: currTetroPosition, // not newPosition!!
        color: COLORS[currTetromino]
      })

      if (hasLineToClear(newGrid)) {
        return updateTetrisStateStorage(_.assign({}, state, {
          score: score + 10,
          linesCleared: linesCleared + 1,
          grid: clearLines(newGrid),
          currTetromino: nextTetromino,
          currTetroGrid: SHAPES[nextTetromino],
          currTetroPosition: getInitTetroPosition(nextTetromino),
          nextTetromino: getRandomTetromino(),
          dropInterval: dropInterval <= DROP_INTERVAL_MIN ? DROP_INTERVAL_MIN :  dropInterval - DROP_INTERVAL_DEC
        }))
      } else {
        return updateTetrisStateStorage(_.assign({}, state, {
          grid: newGrid,
          score: score + 4,
          currTetromino: nextTetromino,
          currTetroGrid: SHAPES[nextTetromino],
          currTetroPosition: getInitTetroPosition(nextTetromino),
          nextTetromino: getRandomTetromino()
        }))
      }
    
    case ENABLE_ACCELERATE:
      return _.assign({}, state, { isAccelerating: true })
    case DISABLE_ACCELERATE:
      return _.assign({}, state, { isAccelerating: false })
    default:
      return state
  }
}
