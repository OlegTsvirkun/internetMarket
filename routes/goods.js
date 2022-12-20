const express = require('express');
const { getGoods, getCategory } = require('../controllers/goods');
const router = express.Router();


router.get('/', getCategory);
router.get('/cat/:id', getGoods);

module.exports = router;