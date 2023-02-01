

const express = require('express');
const { getOfficeContact, getSecondaryContacts} = require('../controllers/contacts');
const router = express.Router();


router.get('/main-contacts', getOfficeContact);
router.get('/secondary-contacts', getSecondaryContacts);
module.exports = router;
