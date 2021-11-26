import Axios from 'axios'

if(process.env.NODE_ENV !== 'production')
    Axios.defaults.baseURL = 'http://localhost:5000' // TODO: change at time of deploy

export const call = async (method, path, data, option) => {
    const response =  await Axios[method](`/api/${path}`, data, option)

    return response.data
}

export const setToken = (token) =>{
    if(token){
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }else{
        delete Axios.defaults.headers.common['Authorization'] 
    }
}

const api_data = {
    Axios,
    call,
    setToken
}

export default api_data;