const ApiErrors = require('../helpers/ApiErrors');
const AuthUser = require('../models/authUser');
const Order = require('../models/order');
 const User = require('../models/user');



const getUserOrders = async (req, res, next) => {

    try {
        const login = req.user.email
        const user = await AuthUser.findOne({ email: login })
        const order = await Order
            .find({ userId: user._id }, { userId: 0 })
            .populate({ path: 'delivery', populate: { path: 'office', select: 'name address tel scheduling' } }
            )
            .populate('userContacts',
                { _id: 0 }
            )

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
        const user = await User.findOne({ email: login })

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