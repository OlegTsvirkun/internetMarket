const express = require('express');
const { getGoods, getCategory,getGood } = require('../controllers/goods');
const router = express.Router();


router.get('/', getCategory);
router.get('/cat/:id', getGoods);
router.get('/good', getGood);

module.exports = router;