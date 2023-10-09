import _ from 'lodash'
import { PAUSING } from '../constants/gameStatus'

export function getTetrisStateFromStorage() {
  if (localStorage.getItem('tetrisState')) {
    return _.assign({}, JSON.parse(localStorage.getItem('tetrisState')), { gameStatus: PAUSING })
  }
}

export function updateTetrisStateStorage(state) {
  if (!state) {
    localStorage.removeItem('tetrisState')
    return
  }
  localStorage.setItem('tetrisState', JSON.stringify(state))
  return state
}
