const ApiErrors = require('../helpers/ApiErrors');
const AuthUser = require('../models/authUser');
const Order = require('../models/order');
 const User = require('../models/user');



const getUserOrders = async (req, res, next) => {
    // "RIGISTERED"  "Awaiting payment" , "paid","confirmed ",completed , cancelled, delivering
    // console.log( req.user.email);
    try {
        const login = req.user.email
        // console.log(login);
        const user = await AuthUser.findOne({ email: login })
        // console.log(user._id)
        const order = await Order
            .find({ userId: user._id }, { userId: 0 })
            .populate({ path: 'delivery', populate: { path: 'office', select: 'name address tel scheduling' } }
            )
            // .populate('delivery.office')
            .populate('userContacts',
                { _id: 0 }
            )

        // console.log('order>>', order);
        //     const officeId = order.delivery.office
        //     const office= await ShopContact.findOne({id:officeId})
        // order.delivery.office=office
        // await OrderStatus.create({value:'REGISTERED'})
        // await OrderStatus.create({value:'AWAITING PAYMENT'})
        // await OrderStatus.create({value:'PAID'})
        // await OrderStatus.create({value:'CONFIRMED'})
        // await OrderStatus.create({value:'COMPLETED'})
        // await OrderStatus.create({value:'DELIVERING'})
        res.json({ ...order, userId: login })
    } catch (error) {
        console.log(error);
        next(ApiErrors.badRequest(error.message))
    }
}

const getUserInfo = async (req, res, next) => {
    try {
        const login = req.user.email
        const user = await User.findOne({ email: login })
        // console.log(user)
        res.json({ user })
    } catch (error) {
        console.log(error);
        next(ApiErrors.badRequest(error.message))
    }
}
const changegUserConfig = async (req, res, next) => {
    try {
        const login = req.user.email
        const { email, tel, name, firstname } = req.body
        const userData = req.body
        // console.log('userData!', userData)
        const user = await User.findOne({ email: login })
        // console.log('user', user)

        if (user) {
            if (!email) {
                const UpgrUser = await User.findOneAndUpdate({ email: login }
                    , { ...userData }
                )
                return res.json({ response: 'Змінено', UpgrUser })
            } else if (email) {
                const authUser =  await AuthUser.findOne({ email: email })
                if (authUser?.email) return next(ApiErrors.badRequest("Така адреса вже зареєстрована"))
               const udatedAuthUser = await AuthUser.findOneAndUpdate({ email: login }, { email: email })
                await User.findOneAndUpdate({ email: login }, { ...userData })
                // console.log('udatedAuthUser>>',udatedAuthUser)
                return res.json({ response: 'Змінено з email' })

            }

        }
        if (!user) {
            const newUser = await User.create({ tel, name, firstname, email: login })
            return res.json({ response: 'Created new user', newUser })

        }
        res.json({ response: 'OK' })
    } catch (error) {
        return next(ApiErrors.badRequest(error.message))
 
    }
}





module.exports = {
    getUserOrders,
    getUserInfo, changegUserConfig
}