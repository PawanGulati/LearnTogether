import {store} from '../../store'
import { auth_message } from '../../store/user-store/user-actions'
import api from './api'

export const set_student_following = async(userID)=>{
    try {
        const following = await api.call('get', `auth/user/following/${userID}`)

        return following
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

export const set_mentor_followers = async(userID)=>{
    try {
        const followers = await api.call('get', `auth/user/followers/${userID}`)

        return followers
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