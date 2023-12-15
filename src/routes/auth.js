const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes for authentication
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/change-password', authController.changePasswordHandler);
router.post('/verify-account', authController.verifyAccountHandler);
router.post('/resend-otp', authController.resendOTPHandler);
router.put('/edit-account', authController.editAccount);

module.exports = router;
