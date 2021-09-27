import axios from 'axios';


const api = axios.create({
    //baseURL:"https://api-volunt3r.azurewebsites.net/"
    // baseURL: "http://localhost:3001/"
    // baseURL: "http://voluntier.eastus.cloudapp.azure.com:81"
    baseURL: "http://44.192.103.118:81"
})

export default api;