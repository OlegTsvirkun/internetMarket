import { host, hostAuth } from "../../axios";
import jwt_decode from "jwt-decode"
export const registration = async (email, password) => {
    const {data} = await host.post('user/registration', { email, password, role: 'USER' })
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}
export const login = async (email, password) => {
    const {data} = await host.post('user/login', { email, password })
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}
export const check = async () => {
    const {data} = await hostAuth.get('user/auth')
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}
// export const check = async () => {
//     const response = await host.post('auth/registration')
//     return response
// }

const authServices = {
    registration,
    login,
    check,
}

export default authServices;