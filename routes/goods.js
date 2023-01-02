const express = require('express');
const { getGoods, getCategory,getGood, searchGood, sortGood } = require('../controllers/goods');
const router = express.Router();


router.get('/', getCategory);
// router.get('/*:s',sortGood)
router.get('/cat/:id', getGoods);
router.get('/good', getGood);
router.get('/search', searchGood);
module.exports = router;