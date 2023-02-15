const ApiErrors = require('../helpers/ApiErrors');
const Order = require('../models/order');
const OrderStatus = require('../models/orderStatus');

const getOrderStatuses = async (req, res, next) => {
    try {
        const statuses = await OrderStatus.find({}, { id: 0 }).then(data => data.map(item => item.value))
        res.json({ statuses: statuses })
    } catch (error) {
        return next(ApiErrors.badRequest(error.message))
    }
}
const getOrders = async (req, res, next) => {
    try {
        const statusCode = req.query.status
        let page = parseInt(req.query?.page) - 1 || 0;
        let limit = parseInt(req.query?.limit) || 20;
        let skip = page * limit
        if (!statusCode) return next(ApiErrors.badRequest("Введено невірний статус заказу"))
        const ordersList = await Order
            .find({ status: statusCode })
            .populate({ path: 'delivery', populate: { path: 'office', select: 'name address tel scheduling' } }
            )
            .populate('userContacts',
                { _id: 0 }
            )
            .limit(limit)
            .skip(skip)
        res.json({ list: ordersList })
    } catch (error) {
        console.log(error)
        return next(ApiErrors.badRequest(error.message))
    }
}
const getOrder = async (req, res, next) => {
    try {
        const id = req.query.id
        if (!id) return next(ApiErrors.badRequest("Не введено id заказу"))
        const order = await Order
            .findOne({ _id: id })
            .populate({ path: 'delivery', populate: { path: 'office', select: 'name address tel scheduling' } }
            )
            .populate('userContacts',
                { _id: 0 }
            )

        res.json({ order })
    } catch (error) {
        console.log(error)
        return next(ApiErrors.badRequest(error.message))
    }
}
const setNewStatus = async (req, res, next) => {
    try {
        const { orderId, status } = req.body
        const statusCode = await OrderStatus
            .findOne({ value: status }).then((data => {
                if (!data?.value) {
                    return next(ApiErrors.badRequest("Такого статуса немає"))
                }
                return data
            }))
        const order = await Order
            .findByIdAndUpdate({ _id: orderId }, { status: statusCode.value }, { new: true })
        res.json({ order, response: 'Статус змінено' })
        // res.json({response:'1111223'})
    } catch (error) {
        console.log('error>>:', error)
        return next(ApiErrors.badRequest(error.message))

    }
}
module.exports = {
    getOrderStatuses,
    getOrders,
    getOrder,
    setNewStatus
}