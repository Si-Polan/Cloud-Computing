const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Routes for payment
router.get('/payment-history', paymentController.paymentHistory);
router.get('/payment-method', paymentController.paymentMethod);
router.post('/process-payment', paymentController.processPayment);

module.exports = router;
