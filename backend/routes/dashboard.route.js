const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboard.controller');

// Define route for getting dashboard data
router.get('/', getDashboardData);

module.exports = router;
