import React from 'react';
import ReactDOM from 'react-dom';
import root from './reducers/root'
import _ from 'lodash'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import TetrisGame from './components/TetrisGame'

const rootStore = createStore(
  root,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={rootStore}>
    <TetrisGame />
  </Provider>,
  document.getElementById('root')
)
