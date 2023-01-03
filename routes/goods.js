const express = require('express');
const { getGoods, getCategory,getGood, searchGood, sortGood } = require('../controllers/goods');
const { createOrder } = require('../controllers/order');
const router = express.Router();


router.get('/', getCategory);
// router.get('/*:s',sortGood) 
router.get('/cat/:id', getGoods);
router.get('/good', getGood);
router.get('/search', searchGood);
router.post('/finish-order', createOrder);
module.exports = router;