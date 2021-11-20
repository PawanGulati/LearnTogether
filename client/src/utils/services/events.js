import api from './api'

import {store} from '../../store'
import { auth_fail } from '../../store/user-store/user-actions'

export const set_past_events = async()=>{
    try {
        const events = await api.call('get', 'event/me')

        return events
    } catch (err) {
        if(err.response){
            const {error} = err.response?.data
            store.dispatch(auth_fail(error))
        }
        else{
            store.dispatch(auth_fail({message:err.message}))
        }
    }
}