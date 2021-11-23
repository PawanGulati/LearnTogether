import studentTypes from './student-types'
import api from '../../utils/services/api'

const {STUDENT_START, STUDENT_FAIL, SET_CUR_STUDENT, REMOVE_ERROR_STUDENT, POP_UP_STUDENT} = studentTypes

export const set_cur_student = student =>({
    type: SET_CUR_STUDENT,
    student
})

export const student_start = () =>({
    type: STUDENT_START
})

export const student_fail = error =>({
    type: STUDENT_FAIL,
    error
})

export const remove_error = () =>({
    type: REMOVE_ERROR_STUDENT
})

export const student_message = (text,popUpType,open) =>({
    type: POP_UP_STUDENT,
    text,
    popUpType,
    open
})

export const set_cur_student_async = ()=> {
    return async dispatch => {
        try {
            dispatch(student_start())
            
            const student = await api.call('get', 'student/me')

            dispatch(set_cur_student(student))

            dispatch(remove_error())
        } catch (err) {
            if(err.response){
                const {error} = err.response.data
                dispatch(student_fail(error))
            }
            else{
                dispatch(student_fail({message:err.message}))
            }
        }
    }
}