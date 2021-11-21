import api from './api'

import {store} from '../../store'
import { auth_message } from '../../store/user-store/user-actions'

export const set_my_demands = async()=>{
    try {
        const demands = await api.call('get', 'demand/me')

        return demands
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

export const set_all_demands = async()=>{
    try {
        const demands = await api.call('get', 'demand')

        return demands
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

export const create_demand = async(data)=>{
    try {
        const demands = await api.call('post', 'demand', data)
        store.dispatch(auth_message('You have created a Demand!! Refresh the list','success',true))

        return demands
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

export const demand_to_event = async (demandID) =>{
    try {
        const demands = await api.call('post', `event/demand/${demandID}`)
        store.dispatch(auth_message('Converted to an Event!! Refresh the list','success',true))

        return demands
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