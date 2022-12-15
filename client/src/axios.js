import axios from "axios";

const instance = axios.create({
    // baseURL: ''
    baseURL: 'http://localhost:5000'
})
export default instance