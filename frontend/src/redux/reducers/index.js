import { combineReducers } from 'redux';
import travelsReducer from './travelsReducer';
import loginReducer from './loginReducer';



const allReducers = combineReducers({
    travels: travelsReducer,
    login: loginReducer
})

export default allReducers;