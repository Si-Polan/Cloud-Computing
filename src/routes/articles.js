const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Routes for articles
router.get('/', articleController.listArticles);
router.get('/detail/:id', articleController.detailArticle);

module.exports = router;
