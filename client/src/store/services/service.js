import axios from '../../axios'
// import axios from 'axios'
const getMain = async () => {
    // console.log("1");
    const main = await axios.get('/');
    // console.log(main.data)
    return main.data;
}
const getCategory = async (category) => {
    const main = await axios.get(`/cat/${category}`);
    // console.log(main.data)
    return main.data;
}
const services = {
    getMain,
    getCategory
   
}

export default services;