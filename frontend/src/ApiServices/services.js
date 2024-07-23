import axios from '../Axios/axios'; 
import BaseAxios from 'axios'; 
import { baseURL } from '../Axios/axios'; 


export function getProductList() {
    return axios.get('product/').then((res) => {
        return res
    })
} 
