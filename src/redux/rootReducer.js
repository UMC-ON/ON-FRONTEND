import { combineReducers } from 'redux';
import authReducer from './authReducer';
import scrollReducer from './scrollReducer';

const rootReducer = combineReducers({
  user: authReducer,
  scroll: scrollReducer,
});

export default rootReducer;
