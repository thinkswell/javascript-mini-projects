import { combineReducers } from 'redux';
import reducer_weather from './reducer_weather'


const rootReducer = combineReducers({
  weather : reducer_weather 
});

export default rootReducer;
