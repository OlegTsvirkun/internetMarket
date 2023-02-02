const express = require('express');
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { 
    userRegistration,
    userLogin,
    userCheck,
 } = require('../controllers/authController')

 const {
    getUserOrders
 } = require('../controllers/userController')

 
router.post('/registration', userRegistration)
router.post('/login', userLogin)
router.get('/auth',authMiddleware, userCheck)
router.get('/cabinet/orders',getUserOrders)

module.exports = router