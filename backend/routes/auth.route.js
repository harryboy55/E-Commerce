const express = require('express');
const { googleLogin } = require('../controllers/auth.controller');
const router = express.Router();

// Route to handle Google login
router.post('/google', googleLogin);

module.exports = router;
