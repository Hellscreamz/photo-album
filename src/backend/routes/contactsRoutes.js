const express = require('express');
const router = express.Router();
const contactController = require('../controllers/Contacts');

router.post('/send-message', contactController.submitMessage);

module.exports = router;
