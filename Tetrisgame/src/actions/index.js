import {
  GAME_INIT,
  GAME_START,
  GAME_PAUSE,
  GAME_STOP,
  GAME_RESUME
} from '../constants/actionTypes'

import { MOVE, ENABLE_ACCELERATE, DISABLE_ACCELERATE, DROP, ROTATE } from '../constants/actionTypes'
import { PLAYING, STOPPED } from '../constants/gameStatus'
import { DROP_INTERVAL_ACCELERATING } from '../constants/options'
import { setDropTimeout, clearDropTimeout } from '../utils'

export function gameInit() {
  clearDropTimeout()
  return {
    type: GAME_INIT,
  }
}

// thunk
export const drop = () => (dispatch, getState) => {
  const { gameStatus, isAccelerating, dropInterval } = getState()
  // this is ugly tho
  setDropTimeout(() => {
    if (gameStatus === STOPPED) return
    
    if (gameStatus === PLAYING) {
      dispatch({ type: DROP })
    }

    dispatch(drop())
  }, isAccelerating ? DROP_INTERVAL_ACCELERATING : dropInterval)
}

// thunk
export const gameStart = () => (dispatch, getState) => {
  dispatch({ type: GAME_START })
  dispatch(drop())
}

export function gamePause() {
  clearDropTimeout()
  return {
    type: GAME_PAUSE,
  }
}

export const gameResume = () => (dispatch, getState) => {
  dispatch({ type: GAME_RESUME })
  dispatch(drop())
}

export function gameStop() {
  clearDropTimeout()
  return {
    type: GAME_STOP,
  }
}

export const moveRight = () => {
  return {
    type: MOVE,
    payload: 1
  }
}

export const moveLeft = () => {
  return {
    type: MOVE,
    payload: -1
  }
}

export const enableAccelerate = () => {
  return {
    type: ENABLE_ACCELERATE
  }
}

export const disableAccelerate = () => {
  return {
    type: DISABLE_ACCELERATE
  }
}

export const rotate = () => {
  return {
    type: ROTATE
  }
}
