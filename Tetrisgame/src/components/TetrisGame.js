import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Well from './Well'
import InfoPanel from './InfoPanel'

import {
  gameInit, gamePause, gameResume,
  moveLeft, moveRight, enableAccelerate, disableAccelerate, rotate
} from '../actions'
import { PLAYING } from '../constants/gameStatus'
import { TETROMINOS } from '../constants/tetromino'
import { UP, LEFT, RIGHT, DOWN } from '../constants/options' 

import './styles/TetrisGame.css'

// export common class component for test
export class TetrisGame extends Component {
  constructor() {
    super()

    this._onkeydown = this._onkeydown.bind(this)
    this._onkeyup = this._onkeyup.bind(this)
  }

  componentDidMount() {
    window.addEventListener('keydown', this._onkeydown)
    window.addEventListener('keyup', this._onkeyup)

    const { onGameInit } = this.props
    onGameInit()
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._onkeydown)
    window.removeEventListener('keyup', this._onkeyup)
  }

  _onkeydown(e) {
    e.preventDefault()
    
    const {
      onMoveLeft,
      onMoveRight,
      onRotate,
      onEnableAccelerate,
      isPlaying,
      isAccelerating
    } = this.props

    if(!isPlaying) return

    switch(e.keyCode) {
      case UP:
        onRotate()
        break
      case LEFT:
        onMoveLeft()
        break
      case RIGHT:
        onMoveRight()
        break
      case DOWN:
        if (isAccelerating) return
        onEnableAccelerate()
        break
      default:
        return
    }
  }

  _onkeyup(e) {
    const { isPlaying, onDisableAccelerate } = this.props
    if (!isPlaying) return

    if (e.keyCode === DOWN) {
      onDisableAccelerate()
    }
  }

  _getInfoPanelProps() {
    const { score, linesCleared, nextTetromino, gameStatus } = this.props
    return {
      score,
      linesCleared,
      nextTetromino,
      gameStatus
    }
  }

  render() {
    return (
      <div className="tetris-container">
        <Well />
        <InfoPanel {...this._getInfoPanelProps()} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    gameStatus: state.gameStatus,
    score: state.score,
    linesCleared: state.linesCleared,
    nextTetromino: state.nextTetromino,
    isPlaying: state.gameStatus === PLAYING,
    isAccelerating: state.isAccelerating,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onGameInit: () => dispatch(gameInit()),
    onGamePause: () => dispatch(gamePause()),
    onGameResume: () => dispatch(gameResume()),
    onMoveLeft: () => dispatch(moveLeft()),
    onMoveRight: () => dispatch(moveRight()),
    onRotate: () => dispatch(rotate()),
    onEnableAccelerate: () => dispatch(enableAccelerate()),
    onDisableAccelerate: () => dispatch(disableAccelerate())
  }
}

TetrisGame.PropTypes = {
  gameStatus: PropTypes.string,
  isAccelerating: PropTypes.bool,
  isPlaying: PropTypes.bool,
  linesCleared: PropTypes.number,
  nextTetromino: PropTypes.oneOf(TETROMINOS),
  score: PropTypes.number,
  onDisableAccelerate: PropTypes.func,
  onEnableAccelerate: PropTypes.func,
  onGameInit: PropTypes.func,
  onGamePause: PropTypes.func,
  onGameResume: PropTypes.func,
  onMoveLeft: PropTypes.func,
  onMoveRight: PropTypes.func,
  onRotate: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(TetrisGame)
