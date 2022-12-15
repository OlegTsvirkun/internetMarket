import axios from '../../axios'

const getMain = async () => {
    // console.log("1");
    const main = await axios.get('/');
    // console.log(main.data)
    return main.data;
}
const services = {
    getMain,
   
}

export default services;