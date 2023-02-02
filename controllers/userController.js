const ApiErrors = require('../helpers/ApiErrors');
const Order = require('../models/order');
const OrderStatus = require('../models/orderStatus');

const getUserOrders = async (req, res, next) => {
    // "RIGISTERED"  "Awaiting payment" , "paid","confirmed ",completed , cancelled, delivering
try{
    const {login }= req.query
    // console.log(login);
    const order = await Order
    .find({userId: login},{userId:0})
    
    .populate('delivery', 
    { _id: 0,  }
    )
    .populate('userContacts', 
    { _id: 0,}
    )
    .then(data=> data)
    // await OrderStatus.create({value:'RIGISTERED'})
    // await OrderStatus.create({value:'AWAITING PAYMENT'})
    // await OrderStatus.create({value:'PAID'})
    // await OrderStatus.create({value:'CONFIRMED'})
    // await OrderStatus.create({value:'COMPLATED'})
    // await OrderStatus.create({value:'DELIVERING'})
res.json({...order,userId:login})
}catch(error){
    console.log(error); 
    next(ApiErrors.badRequest(error.message))
}
}


module.exports={
    getUserOrders,

}