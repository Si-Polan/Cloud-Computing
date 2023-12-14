const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes for authentication
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/reset-password', authController.resetPassword);
router.post('/verify-account', authController.verifyAccount);
router.post('/resend-otp', authController.resendOTP);
router.put('/edit-account', authController.editAccount);

module.exports = router;

