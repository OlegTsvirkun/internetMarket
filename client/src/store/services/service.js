import axios from '../../axios'
// import axios from 'axios'
const getMain = async () => {
    const main = await axios.get('/');
    return main.data;
}
const getCategory = async (category) => {
    const main = await axios.get(`/cat/${category}`);
    return main.data;
}
const getGood = async (id) => {
    const good = await axios.get(`/good?id=${id}`);
    return good.data;
}
const services = {
    getMain,
    getCategory,
    getGood
   
}

export default services;