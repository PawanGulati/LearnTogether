import {combineReducers} from 'redux'

import userReducer from './user-store/user-reducer'

export default combineReducers({
    user:userReducer,
})