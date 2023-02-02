import { host, hostAuth } from "../../axios";
import jwt_decode from "jwt-decode"
import { USER_CABINET_ROUTE, USER_ORDERS_ROUTE } from "../../utils/constRoutes";

export const getOrders = async (userId) => {
    const  {data}= await hostAuth.get(`${USER_CABINET_ROUTE+USER_ORDERS_ROUTE}?login=${userId}` )
    return data
}



const userServices = {
    getOrders,
}

export default userServices;