import roomTypes from './room-types'

const {ROOM_START, REMOVE_ERROR, ROOM_FAIL, SET_CUR_ROOM, SET_ROOMS} = roomTypes

const initialState = {
    rooms: [],
    cur_room: null,
    loading: false,
    error: null,
}

const reducer = (state = initialState, action)=>{
    switch (action.type) {
        case ROOM_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case ROOM_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error.message
            }
        case SET_CUR_ROOM:
            return {
                ...state,
                cur_room: action.room
            }
        case SET_ROOMS:
            return {
                ...state,
                rooms: [...action.rooms]
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

export default reducer