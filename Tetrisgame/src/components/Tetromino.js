import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SquareBlock from './SquareBlock'
import { WELL_ROW, WELL_COL } from '../constants/options'
import { SHAPES, TETROMINOS } from '../constants/tetromino'

export default class Tetromino extends Component {
  _getTetrominoUlStyle() {
    const { tetroPosition } = this.props

    // todo: remove all redundant grid.length and grid[0].length
    // use WELL_ROW and WELL_COL
    const rows = WELL_ROW
    const cols = WELL_COL

    // for each single block
    const widthPercent = 100 / cols
    const heightPercent = 100 / rows

    /*
      why we use "4" here directly? B/c 4 is the maximum length or width of a tetromino.
      Therefore, giving each child-block { width: 25%, height: 25% } and its according { top, left }
      wouldn't make any of them overflow
    */
    return {
      width: `${4 * widthPercent}%`,
      height: `${4 * heightPercent}%`,
      top: `${tetroPosition.y * heightPercent}%`,
      left: `${tetroPosition.x * widthPercent}%`
    }
  }

  _getNextTetrominoUlStyle() {
    const { tetroGrid } = this.props

    return {
      width: '65%',
      height: '65%',
      top: '35%',
      // the 4x4 grid doesn't fit well into the nextTetromino panel
      // use the hack style for now
      left: tetroGrid === SHAPES['I'] ? '18%' : '30%' 
    }
  }

  _renderTetromino() {
    const { tetroGrid, color } = this.props
    if (!tetroGrid) return

    const rows = tetroGrid.length
    const cols = tetroGrid[0].length
    let result = []

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!tetroGrid[row][col]) continue
  
        result.push(
          <li className="square-block-container"
            key={`t-${row}${col}`}
            // 25 is a quarter of 100, since each of the tetromino is a 4 x 4 square, as we declared above
            style={{
              top: `${row * 25}%`,
              left: `${col * 25}%`
            }}>
            <SquareBlock color={color} />
          </li>
        )
      }
    }
    return result
  }

  render() {
    const { isNextTetromino } = this.props
    return (
      <ul className="tetromino" style={isNextTetromino ? this._getNextTetrominoUlStyle() : this._getTetrominoUlStyle()}>
        { this._renderTetromino() }
      </ul>
    )
  }
}

Tetromino.PropTypes = {
  currTetroGrid: PropTypes.array,
  currTetroPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  currTetromino: PropTypes.oneOf(TETROMINOS),
  gameStatus: PropTypes.string,
  grid: PropTypes.array
}
