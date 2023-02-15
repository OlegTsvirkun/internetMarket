const express = require('express');
const router = express.Router()
const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter')
const contactsRouter = require('./contactsRouter')
const managerRouter = require('./managerRouter');
const authMiddleware = require('../middleware/authMiddleware');


router.use('/user',userRouter)
router.use('/admin',adminRouter)
router.use('/contacts',contactsRouter)
router.use('/manager',authMiddleware,managerRouter)

module.exports = router