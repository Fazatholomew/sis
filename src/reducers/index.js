import {combineReducers} from 'redux'

import namesReducer from './nameReducer';
import apiReducer from './apiReducer';

export default combineReducers({
	names: namesReducer,
	api: apiReducer
})