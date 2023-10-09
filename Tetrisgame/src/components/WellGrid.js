import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SquareBlock from './SquareBlock'

export default class WellGrid extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.grid !== nextProps.grid
  }

  _renderSquareBlocks() {
    const { grid } = this.props
    if (!grid)  return

    const rows = grid.length
    const cols = grid[0].length

    // for each single square block
    const widthPercent = 100 / cols
    const heightPercent = 100 / rows
    
    let result = []

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        result.push(
          <li className="square-block-container"
            key={`r${row}c${col}`}
            style={{
              width: `${widthPercent}%`,
              height: `${heightPercent}%`,
              top: `${row * heightPercent}%`,
              left: `${col * widthPercent}%`
            }}>
            <SquareBlock color={ grid[row][col] } />
          </li>
        )
      }
    }
    return result
  }

  render() {
    return (
      <ul className="well-grid">
        { this._renderSquareBlocks() }
      </ul>
    )
  }
}

WellGrid.PropTypes = {
  grid: PropTypes.array
}
