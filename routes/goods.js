const express = require('express');
const { getGoods, getCategory,getGood, searchGood, sortGood, createGood, createCategory } = require('../controllers/goods');
const { createOrder } = require('../controllers/order');
const router = express.Router();


// router.get('/*:s',sortGood) 
router.get('/cat/:id', getGoods);
router.get('/good', getGood);
router.get('/search', searchGood);
router.post('/finish-order', createOrder);

router.get('/', getCategory);
module.exports = router; 