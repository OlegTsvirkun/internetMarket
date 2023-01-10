const  ShopContact = require('../models/ShopContact');
const { handleError } = require('../helpers/handleError');
const ApiErrors = require('../helpers/ApiErrors');


const getOfficeContact = async (req, res,next) => {
    try{
        const contacts = await ShopContact
        .find({name:"mainOffice"})
        // .create({
        //     name:'mainOffice',
        //     city:"Київ",
        //     address:"вул. Сагайдачного, 12-А",
        //     tel:["+380443641839",
        //     "+380674241839",
        //    " +380504241839",
        //     "+380638241839"],
        //     email:"my_app.store@email.com",
        //     scheduling:{"weekdays":"9:00-20:00","weekends":"10:00-18:00"}
    
        // })
        .then((contact)=>{
        return contact})
        res.status(200).json({...contacts})
    }catch(error){
next(ApiErrors.forbidden(error.messege))
    }
   
    
}

module.exports={
    getOfficeContact
}