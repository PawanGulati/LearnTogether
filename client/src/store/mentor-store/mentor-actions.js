import mentorTypes from './mentor-types'

import api from '../../utils/services/api'

const {MENTOR_START, MENTOR_FAIL, SET_CUR_MENTOR, REMOVE_ERROR_MENTOR, POP_UP_MENTOR} = mentorTypes

export const set_cur_mentor = mentor =>({
    type: SET_CUR_MENTOR,
    mentor
})

export const mentor_start = () =>({
    type: MENTOR_START
})

export const mentor_fail = error =>({
    type: MENTOR_FAIL,
    error
})

export const remove_error_mentor = () =>({
    type: REMOVE_ERROR_MENTOR
})

export const mentor_message = (text, popUpType, open) =>({
    type: POP_UP_MENTOR,
    text,
    popUpType,
    open
})

export const set_cur_mentor_async = ()=> {
    return async dispatch => {
        try {
            dispatch(mentor_start())
            
            const mentor = await api.call('get', 'mentor/me')

            dispatch(set_cur_mentor(mentor))

            dispatch(remove_error_mentor())
        } catch (err) {
            if(err.response){
                const {error} = err.response.data
                dispatch(mentor_fail(error))
            }
            else{
                dispatch(mentor_fail({message:err.message}))
            }
        }
    }
}