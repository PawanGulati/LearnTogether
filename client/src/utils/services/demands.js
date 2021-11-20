import api from './api'

import {store} from '../../store'
import { auth_fail } from '../../store/user-store/user-actions'

export const set_my_demands = async()=>{
    try {
        const demands = await api.call('get', 'demand/me')

        return demands
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