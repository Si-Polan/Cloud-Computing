// help.js

const express = require('express');
const router = express.Router();
const helpController = require('../controllers/helpController');

// Endpoint untuk mendapatkan kategori bantuan
router.get('/categories', helpController.getHelpCategories);

// Endpoint untuk mengirim pesan bantuan
router.post('/messages', helpController.sendHelpMessage);

module.exports = router;
