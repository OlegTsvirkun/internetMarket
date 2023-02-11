import { host, hostAuth } from "../../axios";
import { MANAGER_LIST_ROUTE, MANAGER_ORDER_ROUTE, MANAGER_ROUTE } from "../../utils/constRoutes";


const getOrderStatuses = async () => {
    const order = await hostAuth.get(MANAGER_ROUTE);
    return order.data;
};
const getOrders= async (status) => {
    const order = await hostAuth.get(`${MANAGER_ROUTE}${MANAGER_LIST_ROUTE}?status=${status}`);
    return order.data;
};
const getOrder= async (id) => {
    const order = await hostAuth.get(`${MANAGER_ORDER_ROUTE}?id=${id}`);
    return order.data;
};

const setNewStatus = async(status)=>{
    const order = await hostAuth.post('/manager/order/update-status',status)
    return order.data;

}
export const managerServices = {
    getOrderStatuses,
    getOrders,
    getOrder,
    setNewStatus
} 