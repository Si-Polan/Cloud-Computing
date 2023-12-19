const express = require('express');
const violationController = require('../controllers/violationController');
const multerMiddleware = require('../middleware/multerMiddleware');

const router = express.Router();

// Using multerMiddleware to handle image upload
router.post(
  '/violations',
  multerMiddleware, // Correct usage, removed .single('file')
  violationController.createViolation
);

router.get('/violations/latest', violationController.latestViolations);
router.get('/violations/:violationId', violationController.violationDetail);

module.exports = router;
