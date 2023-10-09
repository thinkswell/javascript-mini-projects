import React from 'react'
import PropTypes from 'prop-types'

const SquareBlock = ({ color }) => (
  <div className="square-block" style={{ backgroundColor: color }}></div>
)

SquareBlock.PropTypes = {
  color: PropTypes.string
}

export default SquareBlock
