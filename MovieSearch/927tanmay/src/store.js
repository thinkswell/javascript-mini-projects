import {createStore, applyMiddleware} from 'redux'; 
import thunk from 'redux-thunk';
import

const middleware = [thunk];
const initialState={};

const store = createStore();