import api from '../../utils/services/api'
import roomTypes from './room-types'

const {ROOM_START, REMOVE_ERROR, ROOM_FAIL, SET_CUR_ROOM, SET_ROOMS} = roomTypes

export const set_cur_room = room =>({
    type: SET_CUR_ROOM,
    room
})

export const set_cur_rooms = rooms =>({
    type: SET_ROOMS,
    rooms
})

export const room_start = () =>({
    type: ROOM_START
})

export const room_fail = error =>({
    type: ROOM_FAIL,
    error
})

export const remove_error = () =>({
    type: REMOVE_ERROR
})

export const set_rooms_async = () =>{
    return async dispatch =>{
        try {
            dispatch(room_start())

            const rooms = await api.call('get', 'rooms')

            dispatch(set_cur_rooms(rooms))

            dispatch(remove_error())
        } catch (err) {
            if(err.response){
                const {error} = err.response.data
                dispatch(room_fail(error))
            }
            else{
                dispatch(room_fail({message:err.message}))
            }            
        }
    }
}

export const set_room_async = (id) =>{
    return async dispatch =>{
        try {
            dispatch(room_start())

            const room = await api.call('get', `room/${id}`)

            dispatch(set_cur_room(room))

            dispatch(remove_error())
        } catch (err) {
            if(err.response){
                const {error} = err.response.data
                dispatch(room_fail(error))
            }
            else{
                dispatch(room_fail({message:err.message}))
            }            
        }
    }
}