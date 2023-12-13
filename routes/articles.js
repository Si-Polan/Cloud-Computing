const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Routes for articles
router.get('/', articleController.listArticles);
router.post('/share', articleController.shareArticle);

module.exports = router;


// Penting untuk dicatat bahwa Anda perlu mengganti komentar // const articlesController = require('../controllers/articlesController'); dengan pemanggilan aktual ke modul atau file yang berisi logika kontroler untuk artikel Anda. Jangan lupa sesuaikan path dengan struktur direktori proyek Anda.