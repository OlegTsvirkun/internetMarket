

const express = require('express');
const { getOfficeContact} = require('../controllers/contacts');
const router = express.Router();


router.get('/main-contacts', getOfficeContact);
module.exports = router;
