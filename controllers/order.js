const Order = require('../models/order');
const User = require('../models/user');
const OrderDelivery = require('../models/orderDelivery');
const OrderCounter = require('../models/orderCounter');
const ApiErrors = require('../helpers/ApiErrors');
const OrderStatus = require('../models/orderStatus');

const createOrder = async (req, res, next) => {
    try {
        // console.log(req.body);
        const { user: userInfo, delivery: deliveryInfo, orderedGoods ,totalPrice} = req.body
        if (!userInfo) return next(ApiErrors.badRequest('Не заповнено інформацію користувача'))
        if (!deliveryInfo) return next(ApiErrors.badRequest('Не заповнено інформацію по доставці'))
        if (!orderedGoods) return next(ApiErrors.badRequest('Немає товарів у заказі'))
        console.log(orderedGoods);
        const user = await User.create({ ...userInfo })
        const orderDelivery = await OrderDelivery.create({ ...deliveryInfo })
        const orderCount = await OrderCounter.find()
// let status
        const orderStatus = await OrderStatus.findOne({value:'RIGISTERED'})
        const status =  req.body?.status || orderStatus.value

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
            totalPrice:totalPrice,

            // orderId: countOfOrder + 1


        }
        if (req.body?.login) objOrder.userId = req.body?.login

       
                await Order
                    .create({
                        ...objOrder,
                        orderId: countOfOrder + 1,
                        status:status,
                    })
        await OrderCounter.findByIdAndUpdate(idOfCounter, { count: +countOfOrder + 1 })
        //  await   User.deleteMany({})
        //  await OrderDelivery.deleteMany({})
        //  await OrderCounter.create({count:0})
        // await Order.deleteMany({})
        res.status(201).json({ "orderNumber": countOfOrder + 1 })


    } catch (error) {
        console.log(error.message);
        next(ApiErrors.badRequest(error.message))
    }


}

module.exports = {
    createOrder
}