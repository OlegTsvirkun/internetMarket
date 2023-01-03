const Order = require('../models/order');
const User = require('../models/user');
const OrderDelivery = require('../models/orderDelivery');
const OrderCounter = require('../models/orderCounter');
const handleError = (res, error) => {
    console.log(error);
    res.status(500).json({ 'err:': error })
}
const createOrder = async (req, res) => {
    const { user: userInfo, delivery: deliveryInfo, orderedGoods } = req.body

    const user = await User
        .create({ ...userInfo })
        .catch(error => handleError(res, error))

    const orderDelivery = await OrderDelivery
        .create({ ...deliveryInfo })
        .catch(error => handleError(res, error))
    // console.log(orderDelivery.id);
    const orderCount = await OrderCounter
        .find()

        .catch(error => handleError(res, error))
    console.log(orderCount);
    let countOfOrder=0
    let idOfCounter = ''
    if (orderCount[0]) {
        countOfOrder = +orderCount[0]?.count
        idOfCounter = JSON.parse(JSON.stringify(orderCount[0]?._id))
    }
    else {
        countOfOrder = 0;
        idOfCounter = null
    }

    for (let key in orderedGoods) {
        let item = orderedGoods[key]
        const order = await Order
            .create({
                userId: user._id,
                goodId: item.id,
                delivery: orderDelivery._id,
                count: item.count,
                price: item.price,
                totalPrice: item.totalPrice,
                orderId: countOfOrder + 1

            })
            .catch(error => handleError(res, error))
            .finally(() => OrderCounter.findByIdAndUpdate(idOfCounter, { count: +countOfOrder + 1 }))
    }

    try {

        //  await   User.deleteMany({})
        //  await OrderDelivery.deleteMany({})
        //  await OrderCounter.create({count:0})
        // await Order.deleteMany({})
    }
    catch (err) {
        console.log(err);
    }
    res.status(201).json({ "orderNumber": countOfOrder + 1 })



}

module.exports = {
    createOrder
}