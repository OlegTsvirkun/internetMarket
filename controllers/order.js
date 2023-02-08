const Order = require('../models/order');
const User = require('../models/user');
const OrderDelivery = require('../models/orderDelivery');
const OrderCounter = require('../models/orderCounter');
const ApiErrors = require('../helpers/ApiErrors');
const OrderStatus = require('../models/orderStatus');
const AuthUser = require('../models/authUser');

const isUserRegistered = async (req, res, next) => {

    try{
        console.log(req.query)
      const {email,tel} = req.query
      if(email){
         await AuthUser.find({ email: email }).then(data => {
              console.log(data,'data');
              if (data.length) return res.json({isUserRegistered:true,message:'Користувач з таким email вже є. Авторизуйтеся.'})
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
       
        res.json({isUserRegistered:false})
    }catch(error){
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

       
        // console.log(orderedGoods);
        // console.log('1');
        const user = await User.create({ ...userInfo })
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
        if (req.body?.login){ 
            const userID = await AuthUser.findOne({email:req.body?.login})
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
        res.status(201).json({ "orderNumber": countOfOrder + 1 })


    } catch (error) {
        console.log('ERRORRRR:',error.message);
        next(ApiErrors.badRequest(error.message))
    }


}

module.exports = {
    createOrder,
    isUserRegistered
}