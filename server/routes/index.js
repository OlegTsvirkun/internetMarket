const express = require('express');
const router = express.Router()
const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter')
const contactsRouter = require('./contactsRouter')
const managerRouter = require('./managerRouter');
const publicRoutes =require('./goodsRouter'); 
const checkRole = require('../middleware/checkRoleMiddleware');

router.use('/user',userRouter)
router.use('/admin',checkRole('ADMIN'),adminRouter)
router.use('/contacts',contactsRouter)
router.use('/manager',checkRole('MANAGER'),managerRouter)
router.use('/',publicRoutes)

module.exports = router