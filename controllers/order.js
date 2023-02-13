require('dotenv').config();
const Order = require('../models/order');
const User = require('../models/user');
const OrderDelivery = require('../models/orderDelivery');
const OrderCounter = require('../models/orderCounter');
const ApiErrors = require('../helpers/ApiErrors');
const OrderStatus = require('../models/orderStatus');
const AuthUser = require('../models/authUser');
const nodemailer = require('nodemailer');
const ShopContact = require('../models/ShopContact');

const isUserRegistered = async (req, res, next) => {

    try {
        console.log(req.query)
        const { email, tel } = req.query
        if (email) {
            await AuthUser.find({ email: email }).then(data => {
                console.log(data, 'data');
                if (data.length) return res.json({ isUserRegistered: true, message: 'Користувач з таким email вже є. Авторизуйтеся.' })
                //   return res.json({isUserRegistered:true,message:'Користувач з таким email вже є. Авторизуйтеся.'})
            })

        }
        //   if(tel){
        //     const user =  await User.findOne({ tel: tel }).then( data => {
        //           console.log(data,'З таким телефоном є');
        //           return data


        //     })
        //     if(user?.tel) {
        //         await AuthUser.find({ email: data.email }).then(()=>{
        //             if(data.length) return res.json({isUserRegistered:true, response: "З таким телефоном та поштою є.Авторизуйтеся"})
        //         })
        //     }
        //   }

        res.json({ isUserRegistered: false })
    } catch (error) {
        next(ApiErrors.badRequest(error.message))

    }
}

const createOrder = async (req, res, next) => {
    try {
        // console.log(req.body);
        const { user: userInfo, delivery: deliveryInfo, orderedGoods, totalPrice } = req.body
        if (!userInfo) return next(ApiErrors.badRequest('Не заповнено інформацію користувача'))
        if (!deliveryInfo) return next(ApiErrors.badRequest('Не заповнено інформацію по доставці'))
        if (!orderedGoods) return next(ApiErrors.badRequest('Немає товарів у заказі'))


        console.log(deliveryInfo);
        console.log('1');
        const isUserRegistered = await User.findOne({ email: userInfo.email }).then((data) => {
            if(data){
            if (data.tel == userInfo.tel && data.name == userInfo.name && data.firstname == userInfo.firstname) return true
            return false
        }
            return false
        })
        console.log('isUserRegistered>>', isUserRegistered)
        let user
        if (!isUserRegistered){ user = await User.create({ ...userInfo })
        }else{
            user=await User.findOne({ email: userInfo.email })
        }
        // console.log('2');

        // if (!deliveryInfo.office) {
        //     delete deliveryInfo.office
        //     // console.log(deliveryInfo,'deliveryInfo.office');

        // }
        const orderDelivery = await OrderDelivery.create({ ...deliveryInfo })
        const orderCount = await OrderCounter.find()
        // let status
        const orderStatus = await OrderStatus.findOne({ value: 'REGISTERED' })
        const status = req.body?.status || orderStatus.value

        let countOfOrder = 0
        let idOfCounter = ''
        if (orderCount[0]) {
            countOfOrder = +orderCount[0]?.count
            idOfCounter = JSON.parse(JSON.stringify(orderCount[0]?._id))
        }
        else {
            countOfOrder = 0;
            idOfCounter = null
        }

        let objOrder = {
            userContacts: user._id,
            delivery: orderDelivery._id,
            goods: orderedGoods,
            totalPrice: totalPrice,

            // orderId: countOfOrder + 1


        }
        if (req.body?.login) {
            const userID = await AuthUser.findOne({ email: req.body?.login })
            objOrder.userId = userID._id
        }

        await Order
            .create({
                ...objOrder,
                orderId: countOfOrder + 1,
                status: status,
            })
        await OrderCounter.findByIdAndUpdate(idOfCounter, { count: +countOfOrder + 1 })
        //  await   User.deleteMany({})
        //  await OrderDelivery.deleteMany({})
        //  await OrderCounter.create({count:0})
        // await Order.deleteMany({})
const contacts = await ShopContact.findOne({type:'mainOffice'})
console.log('contacts...',contacts)
        const mailSender = async (status, userInfo, orderedGoods, deliveryInfo) => {
            let res = `
            <h2>Дякуємо Вам за те що скористувались нашим інтернет-магазином "AppStore" ${userInfo.name}</h>
            <p>Ваше замовлення номер: ${countOfOrder + 1} від ${new Date().toLocaleString()}</p>
            <p>Статус замовлення: ${status}</p>
            `;
            let text =`Дякуємо Вам за те що скористувались нашим інтернет-магазином "AppStore" ${userInfo.name}. Ваше замовлення номер: ${countOfOrder + 1} від ${new Date().toLocaleString()}.Статус замовлення: ${status}`
            for (let i = 0; i < orderedGoods.length; i++) {
                res += `<p>${orderedGoods[i].name} </p>
                <h4>Кількість: ${orderedGoods[i].count}</h4>
                <h4>Ціна: ${orderedGoods[i].price}</h4>
                <h2>Разом: ${orderedGoods[i].count * orderedGoods[i].price} грн.</h2>`
                text+=`Товар: ${orderedGoods[i].name}, кількість: ${orderedGoods[i].count}, ціна: ${orderedGoods[i].price},  разом: ${orderedGoods[i].count * orderedGoods[i].price} грн.`
            }

            res += `<p><h2>Загальна вартість: ${totalPrice} грн.<h2/></p>`
            text+=`Загальна вартість: ${totalPrice} грн.`
            res += `<p>${deliveryInfo.delivery}</p>
                    <p>${deliveryInfo?.city || ''} ${deliveryInfo?.street || ''} ${deliveryInfo?.house || ''} ${deliveryInfo?.litHouse || ''}  ${deliveryInfo?.appartment || ''}</p>
                    <p>${deliveryInfo?.postNP || ''}</p>
                    <br>
                    `
                    text+=`${deliveryInfo.delivery}
                ${deliveryInfo?.city || ''} ${deliveryInfo?.street || ''} ${deliveryInfo?.house || ''} ${deliveryInfo?.litHouse || ''}  ${deliveryInfo?.appartment || ''}
                ${deliveryInfo?.postNP || ''}
                    `
            res += `<p><h3>Наш менеджер зв'яжеться з Вами у найближчий час</h3></p>`
            text += `Наш менеджер зв'яжеться з Вами у найближчий час`
            res+=`<h5>Наші контакти: ${contacts.tel.map(t=>`<p>${t}<p/>`)} </h5>`
            text+=`Наші контакти: ${contacts.tel.map(t=>`<p>${t}<p/>`)}`
            console.log(res)
            // let testAccount = await nodemailer.createTestAccount();
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                }
            })
            let mailOptions = {
                from: `<${process.env.EMAIL_USERNAME}>`,
                to: `${process.env.EMAIL_USERNAME}, ${userInfo.email}`,
                subject: 'MyApple Store, замовлення №:' + (countOfOrder + 1),
                text: text,
                html: res,
            }

            let info = await transporter.sendMail(mailOptions)
            console.log('MessageSent: %s', info.messageId)
            console.log('MessagePreview: %s', nodemailer.getTestMessageUrl(info))
            return true
        }


        mailSender(status, userInfo, orderedGoods, deliveryInfo)


        res.status(201).json({ "orderNumber": countOfOrder + 1 })


    } catch (error) {
        console.log('ERRORRRR:', error.message);
        next(ApiErrors.badRequest(error.message))
    }


}

module.exports = {
    createOrder,
    isUserRegistered
}