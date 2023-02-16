const express = require('express');
const { getGoods, getCategory,getGood, searchGood, sortGood, createGood, createCategory, searchGoodByArticul } = require('../controllers/goodsController');
const { createOrder } = require('../controllers/orderController');
const router = express.Router();


router.get('/cat/:id', getGoods);
router.get('/good', getGood);
router.get('/search', searchGood);
router.get('/search-articul', searchGoodByArticul);
router.post('/finish-order', createOrder);
router.get('/', getCategory);


module.exports = router; 