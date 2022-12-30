const express = require('express');
const { getGoods, getCategory,getGood, searchGood } = require('../controllers/goods');
const router = express.Router();


router.get('/', getCategory);
router.get('/cat/:id', getGoods);
router.get('/good', getGood);
router.get('/search', searchGood);

module.exports = router;