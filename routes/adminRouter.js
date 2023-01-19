const express = require('express');
const {  createGood, createCategory ,updateGood,removeImage,removeGood} = require('../controllers/admin');
const router = express.Router();

router.post('/create-good',createGood)
router.post('/create-category',createCategory)
router.post("/update-good",updateGood)
router.post("/remove-image",removeImage)
router.post("/remove-good",removeGood)
// router.post('/admin/update-category',updateCategory)

module.exports = router;
