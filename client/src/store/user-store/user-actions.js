import userTypes from './user-types'
import api from '../../utils/services/api'

import jwtDecode from 'jwt-decode'
import { set_cur_student, student_start } from '../student-store/student-actions'
import { mentor_start,  set_cur_mentor } from '../mentor-store/mentor-actions'

const {AUTH_START,AUTH_SUCCESS,AUTH_FAIL,REMOVE_ERROR,POP_UP} = userTypes

export const auth_start = () =>({
    type:AUTH_START
})

export const auth_message = (text,popUpType,open) =>({
    type:POP_UP,
    text,
    popUpType,
    open
})

export const auth_success = user =>({
    type:AUTH_SUCCESS,
    user
})

export const auth_fail = error =>({
    type:AUTH_FAIL,
    error
})

export const remove_error = () =>({
    type:REMOVE_ERROR
})

const set_token = token =>{
    api.setToken(token)
}

export const set_cur_user = ({api_type, ...data}) =>{
    return async dispatch =>{
        try {
            dispatch(auth_start())
            const {token, ...user} = await api.call('post',`auth/${api_type}`,data)

            set_token(token)
            localStorage.setItem(
                'jwtToken',token
            )

            const time_to_login = jwtDecode(token).exp
            localStorage.setItem(
                'timer',JSON.stringify(time_to_login)
            )

            dispatch(auth_success(user.user))
            dispatch(auth_message('You have successfully logged in','success',true))
            dispatch(remove_error())
            return true
        } catch (err) {
            if(err.response){
                const {error} = err.response?.data
                dispatch(auth_message(error.message,'error', true))
                dispatch(auth_fail(error))
            }
            else{
                dispatch(auth_message(err.message,'error', true))
                dispatch(auth_fail({message:err.message}))
            }
        }
    }
}

export const set_user_fromID = () =>{
    return async dispatch =>{
        try {
            dispatch(auth_start())
            dispatch(mentor_start())
            dispatch(student_start())

            const user = await api.call('get','auth/user/me')

            dispatch(auth_success(user))

            dispatch(remove_error())

            return true
        }catch (err) {
            if(err.response){
                const {error} = err.response?.data
                dispatch(auth_fail(error))
            }
            else{
                dispatch(auth_fail({message:err.message}))
            }
        }
    }
}

export const logout = ()=>{
    return dispatch =>{
        localStorage.clear()
        set_token(null)

        dispatch(auth_success(null))
        dispatch(set_cur_mentor(null))
        dispatch(set_cur_student(null))
    }
}
