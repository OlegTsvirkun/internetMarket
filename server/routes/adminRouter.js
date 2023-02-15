const express = require('express');
const {  createGood, createCategory ,updateGood,removeImage,removeGood} = require('../controllers/adminController')
const router = express.Router();

router.post('/create-good',createGood)
router.post('/create-category',createCategory)
router.post("/update-good",updateGood)
router.post("/remove-image",removeImage)
router.post("/remove-good",removeGood)

module.exports = router;
