import { store } from "../../store"
import { auth_message } from "../../store/user-store/user-actions"
import api from '../../utils/services/api'

export const set_my_bookings = async () =>{
    try {
        const bookings = await api.call('get', 'event/book')

        return bookings
    } catch (err) {
        if(err.response){
            const {error} = err.response?.data
            store.dispatch(auth_message(error.message,'error',true))
        }
        else{
            store.dispatch(auth_message(err.message,'error',true))
        }
    }
}