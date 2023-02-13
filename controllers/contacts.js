const ShopContact = require('../models/ShopContact');
const ApiErrors = require('../helpers/ApiErrors');
const User = require('../models/user');
const OrderDelivery = require('../models/orderDelivery');
const Order = require('../models/order');
const OrderCounter = require('../models/orderCounter');


const getOfficeContact = async (req, res, next) => {
    try {
      
        //   await OrderDelivery.deleteMany({})
        //  await OrderCounter.create({count:0})
        // await Order.deleteMany({})
        const contact = await ShopContact
            .find({ type: "mainOffice" })
            // .create({
            //     type:'secondaryOffice',
            //     name:'Основний офіс',
            //     city:"Дніпро",
            //     address:"вул.Михайла Грушевського, 10",
            //     tel:["+380562445566",
            //     "+380672211678",
            //    " +380502211678",
            //     "+380632211678"],
            //     email:"my_app.store.dn@email.com",
            //     scheduling:{"weekdays":"9:00-20:00","weekends":"10:00-18:00"}

            // })
            .then((contact) => {
                return contact
            })
        res.status(200).json({ ...contact })
    } catch (error) {
        next(ApiErrors.forbidden(error.messege))
    }
}


    const getSecondaryContacts = async (req, res, next) => {
        try {
            const contacts = await ShopContact
                .find({ type: "secondaryOffice" })
                // .create({
                   // type:'secondaryOffice',
                //     name:'Представництво',
                //     city:"Дніпро",
                //     address:"вул.Михайла Грушевського, 10",
                //     tel:["+380562445566",
                //     "+380672211678",
                //    " +380502211678",
                //     "+380632211678"],
                //     email:"my_app.store.dn@email.com",
                //     scheduling:{"weekdays":"9:00-20:00","weekends":"10:00-18:00"}

                // })
                .then((contact) => {
                    return contact
                })
                console.log(contacts);
            res.status(200).json([ ...contacts ])
        } catch (error) {
            next(ApiErrors.forbidden(error.messege))
        }


    }

    module.exports = {
        getOfficeContact,
        getSecondaryContacts
    }