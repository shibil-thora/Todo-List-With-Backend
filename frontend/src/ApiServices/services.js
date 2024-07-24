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
