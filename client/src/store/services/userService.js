import { host, hostAuth } from "../../axios";
import { USER_CABINET_ROUTE, USER_ORDERS_ROUTE } from "../../utils/constRoutes";

export const getOrders = async () => {
    const  {data}= await hostAuth.get(`${USER_CABINET_ROUTE+USER_ORDERS_ROUTE}` )
    return data
}
export const getUserInfo = async () => {
    const  {data}= await hostAuth.get(`/user/info` )
    return data
}

export const isUserRegistered = async(email)=>{
    const {data} = await host.get(`/user/isUser?email=${email}`)
    return data
}
export const changeUserData = async(userData)=>{
    const {data} = await hostAuth.post(`/user/change-configs`,userData)
    return data
}


const userServices = {
    getOrders,
    getUserInfo,
    changeUserData,
    isUserRegistered
}

export default userServices;