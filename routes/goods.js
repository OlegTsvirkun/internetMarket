const express = require('express');
const { getGoods, getCategory,getGood} = require('../controllers/goods');
const { createOrder } = require('../controllers/order');
const router = express.Router();


router.get('/', getCategory);
router.get('/cat/:id', getGoods);
router.get('/good', getGood);
router.post('/finish-order', createOrder);

module.exports = router;