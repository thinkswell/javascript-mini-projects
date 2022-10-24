import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom';
import rootreducer from './redux/search_reducer';
import ReduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootreducer, composeWithDevTools(
  applyMiddleware(ReduxPromise),
  // other store enhancers if any
));
// const store = createStore(rootreducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//  const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore());

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>,document.getElementById('root'));
// ReactDOM.render(<Provider store={createStoreWithMiddleware(rootreducer)}><BrowserRouter><App/></BrowserRouter></Provider>,document.getElementById('root'));

serviceWorker.unregister();
