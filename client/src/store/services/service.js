import {host, hostAuth}  from '../../axios'
// import axios from 'axios'
const getMain = async () => {
    const main = await host.get('/');
    return main.data;
}
const getCategory = async (category) => {
    const main = await host.get(`/cat/${category}`);
    // console.log(main.data);
    return main.data;
}
const getGood = async (id) => {
    const good = await host.get(`/good?id=${id}`);
    return good.data;
}
const searchGoods = async(searchValue)=>{
    const goods = await host.get(`/search?${searchValue}`)
    // console.log(goods.data);
    return goods.data
}
const searchGoodsByArticul = async(articul)=>{
    const goods = await host.get(`/search-articul?${articul}`)
    // console.log(goods.data);
    return goods.data
}
const finishOrder = async (orderData) => {
    const order = await host.post('/finish-order', orderData);
    return order.data;
}
const getMainContacts = async () => {
    const contact = await host.get('/contacts/main-contacts');
    return contact.data;
}
const getSeconadryContacts = async () => {
    const contact = await host.get('/contacts/secondary-contacts');
    return contact.data;
}



const services = {
    getMain,
    getCategory,
    getGood,
    finishOrder,
    searchGoods,
    searchGoodsByArticul,
    getMainContacts,
    getSeconadryContacts
   
}

export default services;