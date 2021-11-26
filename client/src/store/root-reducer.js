import {combineReducers} from 'redux'

import userReducer from './user-store/user-reducer'
import studentReducer from './student-store/student-reducer'
import mentorReducer from './mentor-store/mentor-reducer'
import roomReducer from './room-store/room-reducers'

export default combineReducers({
    user: userReducer,
    student: studentReducer,
    mentor: mentorReducer,
    room: roomReducer
})