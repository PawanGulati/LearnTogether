import api from './api'

import {store} from '../../store'
import { auth_message } from '../../store/user-store/user-actions'

export const set_past_events = async()=>{
    try {
        const events = await api.call('get', 'event/me')

        return events
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

export const set_all_events = async(inProgress=true)=>{
    try {
        const events = await api.call('get', `event?inprogress=${inProgress}`)

        return events
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

export const set_all_sessions = async()=>{
    try {
        const events = await api.call('get', 'event?registered=true')

        return events
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

export const join_event = async (eventID) =>{
    try {
        const event = await api.call('post', `event/join/${eventID}`)
        store.dispatch(auth_message('You have joined the Event','success',true))
        return event
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

export const book_event = async ({eventID, data}) =>{
    try {
        const event = await api.call('post', `event/book/${eventID}`, data)
        store.dispatch(auth_message('You have booked the Event', 'success', true))
        
        return event
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

export const create_event = async(data)=>{
    try {
        const event = await api.call('post', 'event', data)
        store.dispatch(auth_message('You have created a Event!! Refresh the page', 'success', true))

        return event
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