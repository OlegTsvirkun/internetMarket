import axios from "axios";

const host = axios.create({
    // baseURL: 'http://localhost:5000/'
    baseURL: process.env.REACT_APP_API_URL
})
const hostAuth = axios.create({
    // baseURL: ''
    baseURL: process.env.REACT_APP_API_URL
})
const interceptorAuth = config => {
    config.headers.autorization = `Bearer ${localStorage.getItem('token')}`
    return config
}
hostAuth.interceptors.request.use(interceptorAuth)
export {
    host,
    hostAuth
}