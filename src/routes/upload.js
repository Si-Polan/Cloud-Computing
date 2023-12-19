const express = require('express');
const router = express.Router();
const multerMiddleware = require('../middleware/multerMiddleware');
const uploadController = require('../controllers/uploadController');

// Endpoint for file upload for articles
router.post('/articles', multerMiddleware, uploadController.uploadFile);

// Endpoint for file upload for violations
router.post('/violations', multerMiddleware, uploadController.uploadFile);

// Endpoint for file upload for proof of payment
router.post('/proof-of-payment', multerMiddleware, uploadController.uploadFile);

module.exports = router;
