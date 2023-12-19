// articles.js
const express = require('express');
const router = express.Router();
const multerMiddleware = require('../middleware/multerMiddleware');
const articleController = require('../controllers/articleController');

// Routes for articles
router.post('/', multerMiddleware, articleController.addArticle);
router.get('/', articleController.listArticles);
router.get('/:id', articleController.detailArticle);

module.exports = router;
