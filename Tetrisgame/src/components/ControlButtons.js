import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import DirectionButton from './DirectionButton'

import { PLAYING, STOPPED, PAUSING } from '../constants/gameStatus'
import GameStatusButton from './GameStatusButton'
import { 
  gamePause, gameResume, gameStart,
  moveLeft, moveRight, enableAccelerate, disableAccelerate, rotate
} from '../actions'

class ControlButtons extends Component {
  _getPauseButtonProps() {
    const { isPlaying, gameStatus, onGamePause, onGameResume } = this.props
    const hasStopped = gameStatus === STOPPED

    return {
      text: gameStatus === PAUSING ? 'resume' : 'pause',
      onClickHandler: isPlaying ? onGamePause : hasStopped ? () => {} : onGameResume
    }
  }

  _getStartButtonProps() {
    const { gameStatus, onGameStart } = this.props
    return {
      text: gameStatus !== STOPPED ? 'Restart' : 'Start',
      onClickHandler: onGameStart 
    }
  }

  _getDirectionButtonProps(direction) {
    const { isPlaying, onMoveLeft, onMoveRight, onRotate, onEnableAccelerate, onDisableAccelerate } = this.props
    
    if (!isPlaying) return { direction }

    switch(direction) {
      case 'left':
      case 'right':
        return {
          direction,
          onClickHandler: direction === 'left' ? onMoveLeft : onMoveRight
        }
      case 'up':
        return {
          direction,
          onClickHandler: onRotate
        }
      case 'down':
        return {
          direction,
          onMouseDownHandler: onEnableAccelerate,
          onMouseUpHandler: onDisableAccelerate
        }
      default:
        return {}
    }
  }

  render() {
    return (
      <div className="control-buttons">
        <div className="start-game">
          <GameStatusButton {...this._getPauseButtonProps()} />
          <GameStatusButton {...this._getStartButtonProps()} />
        </div>
        <div className="directions-control">
          <DirectionButton {...this._getDirectionButtonProps('up')}/>
          <DirectionButton {...this._getDirectionButtonProps('left')}/>
          <DirectionButton {...this._getDirectionButtonProps('right')}/>
          <DirectionButton {...this._getDirectionButtonProps('down')}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    gameStatus: state.gameStatus,
    isPlaying: state.gameStatus === PLAYING 
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // onGameInit: () => dispatch(gameInit()),
    onGameStart: () => dispatch(gameStart()),
    onGamePause: () => dispatch(gamePause()),
    onGameResume: () => dispatch(gameResume()),
    onMoveLeft: () => dispatch(moveLeft()),
    onMoveRight: () => dispatch(moveRight()),
    onRotate: () => dispatch(rotate()),
    onEnableAccelerate: () => dispatch(enableAccelerate()),
    onDisableAccelerate: () => dispatch(disableAccelerate())
  }
}

ControlButtons.PropTypes = {
  gameStatus: PropTypes.string,
  isPlaying: PropTypes.bool,
  onDisableAccelerate: PropTypes.func,
  onEnableAccelerate: PropTypes.func,
  onGamePause: PropTypes.func,
  onGameResume: PropTypes.func,
  onGameStart: PropTypes.func,
  onMoveLeft: PropTypes.func,
  onMoveRight: PropTypes.func,
  onRotate: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlButtons)
