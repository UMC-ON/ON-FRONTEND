import { combineReducers } from 'redux';
import authReducer from './authReducer';
import scrollReducer from './scrollReducer';
import accompanyScrollReducer from './accompanyScrollReducer';

const rootReducer = combineReducers({
  user: authReducer,
  scroll: scrollReducer,
  accompanyScroll: accompanyScrollReducer,
});

export default rootReducer;
