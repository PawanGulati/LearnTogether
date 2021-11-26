import studentTypes from './student-types'

const {STUDENT_START, STUDENT_FAIL, SET_CUR_STUDENT, REMOVE_ERROR_STUDENT, POP_UP_STUDENT} = studentTypes

const initialState = {
    cur_student: null,
    loading: false,
    error: null,
    popUp:{
        text: '',
        type: 'success',
        open: false
    }
}

const reducer = (state = initialState, action)=>{
    switch (action.type) {
        case STUDENT_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case STUDENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error.message
            }
        case SET_CUR_STUDENT:
            return {
                ...state,
                cur_student: action.student
            }
        case POP_UP_STUDENT:
            return {
                ...state,
                popUp:{
                    text:action.text,
                    type:action.popUpType,
                    open:action.open
                }
            }
        case REMOVE_ERROR_STUDENT:
            return {
                ...state,
                loading:false,
                error:null
            }
        default:
            return state
    }
}

export default reducer