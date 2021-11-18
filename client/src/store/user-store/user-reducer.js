import userTypes from './user-types'

const {AUTH_START,AUTH_SUCCESS,AUTH_FAIL,REMOVE_ERROR,POP_UP} = userTypes   

const initial_state = {
    loading:false,
    cur_user:true,
    error:null,
    popUp:{
        text:'',
        type:'success',
        open:false
    }
}

const reducer = (state=initial_state, action) =>{
    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                loading:true,
                error:null
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                // error:null,
                cur_user:action.user,
                // loading:false
            }
        case POP_UP:
            return {
                ...state,
                popUp:{
                    text:action.text,
                    type:action.popUpType,
                    open:action.open
                }
            }    
        case AUTH_FAIL:
            return {
                ...state,
                loading:false,
                error:action.error.message
            }
        case REMOVE_ERROR:
            return {
                ...state,
                loading:false,
                error:null
            }        
        default:
            return state
    }
}

export default reducer;