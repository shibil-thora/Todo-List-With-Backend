import axios from 'axios' 
export const baseURL = 'https://pos-app-stock-management.onrender.com'
export const domainPort = 'pos-app-stock-management.onrender.com' 
 

const axiosInstance = axios.create({
    baseURL, 
    headers: {
        'Content-Type': 'application/json', 
    }, 
}) 

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } 
    return config
})

export default axiosInstance