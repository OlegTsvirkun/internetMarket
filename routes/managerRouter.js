const express = require('express');
const { getOrderStatuses, getOrders,getOrder, setNewStatus } = require('../controllers/managerController');
const router = express.Router();

router.get('/', getOrderStatuses);
router.get('/list', getOrders);
router.get('/order', getOrder);
router.post('/order/update-status', setNewStatus);
module.exports = router; 
