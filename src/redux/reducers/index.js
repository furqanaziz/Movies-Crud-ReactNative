import { combineReducers } from 'redux';
import movieReducer from './reducer';

const rootReducer = combineReducers({
    Movies: movieReducer,
});

export default rootReducer;