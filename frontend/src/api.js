import axios from 'axios';


const api = axios.create({
    baseURL:"https://api-volunt3r.azurewebsites.net/"
})

export default api;