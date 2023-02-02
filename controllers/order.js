const Order = require('../models/order');
const User = require('../models/user');
const OrderDelivery = require('../models/orderDelivery');
const OrderCounter = require('../models/orderCounter');
const ApiErrors = require('../helpers/ApiErrors');

const createOrder = async (req, res,next) => {
    try{
    const { user: userInfo, delivery: deliveryInfo, orderedGoods } = req.body
    if(!userInfo)return next(ApiErrors.badRequest('Не заповнено інформацію користувача'))
    if(!deliveryInfo)return next(ApiErrors.badRequest('Не заповнено інформацію по доставці'))
    if(!orderedGoods)return next(ApiErrors.badRequest('Немає товарів у заказі'))
   console.log(deliveryInfo);
    const user = await User
    .create({ ...userInfo })
    const orderDelivery = await OrderDelivery
    .create({ ...deliveryInfo })
    const orderCount = await OrderCounter
    .find()

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
    
    await Order
        .create({
            userId: user._id,
            goodId: item.id,
            delivery: orderDelivery._id,
            count: item.count,
            price: item.price,
            totalPrice: item.totalPrice,
          
            orderId: countOfOrder + 1

        })
        
      await OrderCounter.findByIdAndUpdate(idOfCounter, { count: +countOfOrder + 1 })
}
   //  await   User.deleteMany({})
        //  await OrderDelivery.deleteMany({})
        //  await OrderCounter.create({count:0})
        // await Order.deleteMany({})
    res.status(201).json({ "orderNumber": countOfOrder + 1 })

    
}catch(error){
    console.log(error.message);
    next(ApiErrors.badRequest(error.message)) 
}
    

}

module.exports = {
    createOrder
}