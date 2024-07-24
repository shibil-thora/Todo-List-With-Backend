import axios from '../Axios/axios'; 
import BaseAxios from 'axios'; 
import { baseURL } from '../Axios/axios'; 


export function getToDoList() {
    return axios.get('getTodos/').then((res) => {
        return res
    })
} 

export function CreateToDo(name) {
    return axios.post('create/', {name}).then((res) => {
        return res
    })
}

export function MarkComplete(id) {
    return axios.post('complete/', {id}).then((res) => {
        return res
    })
}

export function DeleteTask(id) {
    return axios.post('delete/', {id}).then((res) => {
        return res
    })
} 

export function EditTask(id, name) {
    return axios.post('edit/', {id, name}).then((res) => {
        return res
    })
} 

export function LoginUser(username, email) {
    return BaseAxios.post(`${baseURL}/login_user/`, {username, email}).then((res) => {
        return res
    })
}

export function userStatus() {
    return axios.get('/user_status/').then((res) => {
        return res
    }).catch((err) => { 
        console.log(err)
        if (err.response.status == 401){
            const refresh = localStorage.getItem('refresh') 
            return BaseAxios.post(`${baseURL}/api/token/refresh`, {refresh}).then((res) => {
                localStorage.setItem('access', res.data.access); 
                console.log('refreshed'); 
                return axios.get('/user_status/').then((res) => {
                    return res
                })
            }) 
        }
        else{
            console.log('here')
            throw err
        }
       
    })
}