import axios from '../Axios/axios'; 
import BaseAxios from 'axios'; 
import { baseURL } from '../Axios/axios'; 


export function getToDoList() {
    return axios.get('getTodos/').then((res) => {
        return res
    })
} 
