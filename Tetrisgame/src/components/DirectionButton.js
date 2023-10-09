import React from 'react'
import PropTypes from 'prop-types'

const DirectionButton = ({
  direction,
  onClickHandler,
  onMouseDownHandler,
  onMouseUpHandler
}) => (
  <div className="d-btn">
    {direction === 'up' && 
      <button onClick={onClickHandler}>
        <i className="fa fa-caret-up" aria-hidden="true"></i>
      </button>
    }
    {direction === 'left' &&
      <button onClick={onClickHandler}>
        <i className="fa fa-caret-left" aria-hidden="true"></i>
      </button>
    }
    {direction === 'down' &&
      <button onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler}>
        <i className="fa fa-caret-down" aria-hidden="true"></i>
      </button>
    }
    {direction === 'right' &&
      <button onClick={onClickHandler}>
        <i className="fa fa-caret-right" aria-hidden="true"></i>
      </button>
    }
  </div>
)

DirectionButton.PropTypes = {
  direction: PropTypes.string,
  onClickHandler: PropTypes.func,
  onMouseDownHandler: PropTypes.func,
  onMouseUpHandler: PropTypes.func
}

export default DirectionButton

