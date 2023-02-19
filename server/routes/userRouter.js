const express = require('express');
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { 
    userRegistration,
    userLogin,
    userCheck,
 } = require('../controllers/authController')

 const {
    getUserOrders,  getUserInfo, changeUserConfig,
    
 } = require('../controllers/userController');
const { isUserRegistered } = require('../controllers/orderController');

 
router.post('/registration', userRegistration)
router.post('/login', userLogin)
router.get('/isUser',isUserRegistered)
router.get('/auth',authMiddleware, userCheck)
router.get('/cabinet/orders',authMiddleware,getUserOrders)
router.get('/info',authMiddleware,getUserInfo)
router.post('/change-configs',authMiddleware,changeUserConfig)


module.exports = router