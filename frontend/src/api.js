import axios from 'axios';


const api = axios.create({
    //baseURL:"https://api-volunt3r.azurewebsites.net/"
    // baseURL: "http://localhost:3001/"
    baseURL: "http://voluntier.eastus.cloudapp.azure.com"
})

export default api;