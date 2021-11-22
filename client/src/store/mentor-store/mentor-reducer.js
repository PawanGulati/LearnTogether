import mentorTypes from './mentor-types'

const {MENTOR_START, MENTOR_FAIL, SET_CUR_MENTOR, REMOVE_ERROR_MENTOR, POP_UP_MENTOR} = mentorTypes

const initialState = {
    cur_mentor: null,
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
        case MENTOR_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case MENTOR_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error.message
            }
        case SET_CUR_MENTOR:
            return {
                ...state,
                cur_mentor: action.mentor
            }
        case POP_UP_MENTOR:
            return {
                ...state,
                popUp:{
                    text:action.text,
                    type:action.popUpType,
                    open:action.open
                }
            }
        case REMOVE_ERROR_MENTOR:
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