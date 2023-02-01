const ShopContact = require('../models/ShopContact');
const ApiErrors = require('../helpers/ApiErrors');


const getOfficeContact = async (req, res, next) => {
    try {
        const contact = await ShopContact
            .find({ name: "mainOffice" })
            // .create({
            //     name:'secondaryOffice',
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
                .find({ name: "secondaryOffice" })
                // .create({
                //     name:'secondaryOffice',
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