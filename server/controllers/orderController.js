require('dotenv').config();
const Order = require('../models/order');
const User = require('../models/user');
const OrderDelivery = require('../models/orderDelivery');
const OrderCounter = require('../models/orderCounter');
const ApiErrors = require('../helpers/ApiErrors');
const OrderStatus = require('../models/orderStatus');
const AuthUser = require('../models/authUser');
const ShopContact = require('../models/ShopContact');
const {mailSender} = require('./mailSender');
const isUserRegistered = async (req, res, next) => {

    try {
        const { email, tel } = req.query
        if (email) {
            await AuthUser.find({ email: email }).then(data => {
                if (data.length) return res.json({ isUserRegistered: true, message: 'Користувач з таким email вже є. Авторизуйтеся.' })
            })
        }
       
        res.json({ isUserRegistered: false })
    } catch (error) {
        next(ApiErrors.badRequest(error.message))

    }
}

const createOrder = async (req, res, next) => {
    try {
        const { user: userInfo, delivery: deliveryInfo, orderedGoods, totalPrice } = req.body
        if (!userInfo) return next(ApiErrors.badRequest('Не заповнено інформацію користувача'))
        if (!deliveryInfo) return next(ApiErrors.badRequest('Не заповнено інформацію по доставці'))
        if (!orderedGoods) return next(ApiErrors.badRequest('Немає товарів у заказі'))
        const isUserRegistered = await User.findOne({ email: userInfo.email }).then((data) => {
            if (data) {
                if (data.tel == userInfo.tel && data.name == userInfo.name && data.firstname == userInfo.firstname) return true
                return false
            }
            return false
        })
        let user
        if (!isUserRegistered) {
            user = await User.create({ ...userInfo })
        } else {
            user = await User.findOne({ email: userInfo.email })
        }
        const orderDelivery = await OrderDelivery.create({ ...deliveryInfo })
        const orderCount = await OrderCounter.find()
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
        const contacts = await ShopContact.findOne({ type: 'mainOffice' })

       
        mailSender(countOfOrder,status, totalPrice, userInfo, orderedGoods, deliveryInfo,contacts)
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