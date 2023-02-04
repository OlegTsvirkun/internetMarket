const ApiErrors = require('../helpers/ApiErrors');
const Order = require('../models/order');
const OrderStatus = require('../models/orderStatus');
const ShopContact = require('../models/ShopContact');

const getUserOrders = async (req, res, next) => {
    // "RIGISTERED"  "Awaiting payment" , "paid","confirmed ",completed , cancelled, delivering
    // console.log( req.user.email);
try{
    const login = req.user.email
    // console.log(login);
    const order = await Order
    .find({userId: login},{userId:0})
    .populate({path:'delivery', populate:{path:'office',select: 'name address tel scheduling' }}
    )
    // .populate('delivery.office')
    .populate('userContacts', 
    { _id: 0}
    )
  
    // console.log(order);
//     const officeId = order.delivery.office
//     const office= await ShopContact.findOne({id:officeId})
// order.delivery.office=office
    // await OrderStatus.create({value:'REGISTERED'})
    // await OrderStatus.create({value:'AWAITING PAYMENT'})
    // await OrderStatus.create({value:'PAID'})
    // await OrderStatus.create({value:'CONFIRMED'})
    // await OrderStatus.create({value:'COMPLETED'})
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