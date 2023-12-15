// violations.js
const express = require('express');
const router = express.Router();
const violationController = require('../controllers/violationController');

// Routes for violations
router.get('/latest-violations', violationController.latestViolations);
router.get('/user-violations', violationController.userViolations);
router.get('/:violationId', violationController.violationDetail);

module.exports = router;
