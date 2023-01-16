const express = require('express');
const {  createGood, createCategory ,updateGood,removeImage,removeGood} = require('../controllers/admin');
const router = express.Router();

router.post('/admin/create-good',createGood)
router.post('/admin/create-category',createCategory)
router.post("/admin/update-good",updateGood)
router.post("/admin/remove-image",removeImage)
router.post("/admin/remove-good",removeGood)
// router.post('/admin/update-category',updateCategory)

module.exports = router;
