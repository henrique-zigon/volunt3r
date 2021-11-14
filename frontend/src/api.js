import axios from 'axios';
import { getURLApi } from './configs/getUrlApi';

const api = axios.create({
    baseURL: getURLApi()
})

export default api;