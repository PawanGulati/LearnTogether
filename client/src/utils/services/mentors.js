import api from './api'

import { store } from '../../store'
import { auth_message } from '../../store/user-store/user-actions'

export const set_mentors = async()=>{
    try {
        const mentors = await api.call('get', 'mentor')

        return mentors
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