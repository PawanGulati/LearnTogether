import {combineReducers} from 'redux'

import userReducer from './user-store/user-reducer'
import studentReducer from './student-store/student-reducer'

export default combineReducers({
    user: userReducer,
    student: studentReducer,
})