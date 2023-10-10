const express = require('express');
const router = express.Router();
const adminController = require('../controllers/Admin');

router.post('/create-admin', adminController.createAdmin);
router.post('/admin-login', adminController.adminLogin);
router.get('/admin-statistics', adminController.getAdminStatistics);

module.exports = router;
