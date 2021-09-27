import axios from 'axios';

console.log(process.env)

const api = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_URL_API
})

export default api;