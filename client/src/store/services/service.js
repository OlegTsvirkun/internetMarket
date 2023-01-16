import axios from '../../axios'
// import axios from 'axios'
const getMain = async () => {
    const main = await axios.get('/');
    return main.data;
}
const getCategory = async (category) => {
    const main = await axios.get(`/cat/${category}`);
    // console.log(main.data);
    return main.data;
}
const getGood = async (id) => {
    const good = await axios.get(`/good?id=${id}`);
    return good.data;
}
const searchGoods = async(searchValue)=>{
    const goods = await axios.get(`/search?${searchValue}`)
    // console.log(goods.data);
    return goods.data
}
const searchGoodsByArticul = async(articul)=>{
    const goods = await axios.get(`/search-articul?${articul}`)
    // console.log(goods.data);
    return goods.data
}
const finishOrder = async (orderData) => {
    const order = await axios.post('/finish-order', orderData);
    return order.data;
}
const getMainContacts = async () => {
    const contact = await axios.get('/main-contacts');
    return contact.data;
}

const removeImageData = async (imageData) => {
    const image = await axios.post("/admin/remove-image",imageData);
    return image.data;
}
const removeGood = async (id) => {
    const image = await axios.post("/admin/remove-good",id);
    return image.data;
}


const services = {
    getMain,
    getCategory,
    getGood,
    finishOrder,
    searchGoods,
    searchGoodsByArticul,
    getMainContacts,
    removeImageData,
    removeGood
   
}

export default services;