const Article = require('../models/articleModel');
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const path = require('path');

// Konfigurasi Google Cloud Storage
const storage = new Storage({
  projectId: 'your-project-id',
  keyFilename: 'path/to/keyfile.json',
});

// Ganti 'your-bucket-name' dengan nama bucket Anda
const bucket = storage.bucket('your-bucket-name');

// Konfigurasi multer untuk Google Cloud Storage
const multerStorage = multer.memoryStorage(); // Simpan sementara di memori
const multerUpload = multer({ storage: multerStorage });

const articleController = {
  addArticle: async (req, res) => {
    try {
      const { title, content, category, tags } = req.body;

      // Multer menyimpan file di req.file.buffer ketika menggunakan memoryStorage
      const file = req.file;

      // Ganti 'your-folder-name' dengan nama folder di bucket Anda
      const folderName = 'your-folder-name';
      const fileName = `${folderName}/${Date.now()}-${file.originalname}`;

      // Upload file ke Google Cloud Storage
      await bucket.file(fileName).createWriteStream().end(file.buffer);

      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      const newArticle = await Article.create({
        title,
        content,
        category,
        tags,
        imageUrl,
      });

      res.status(201).json({
        code: '201',
        status: 'Created',
        message: 'Artikel berhasil ditambahkan',
        data: {
          id: newArticle.id,
          title: newArticle.title,
          content: newArticle.content,
          category: newArticle.category,
          tags: newArticle.tags,
          imageUrl: newArticle.imageUrl,
          createdAt: newArticle.createdAt,
          updatedAt: newArticle.updatedAt,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        code: '500',
        status: 'Internal Server Error',
        message: 'Gagal menambahkan artikel',
      });
    }
  },

  // Fungsi untuk menampilkan daftar artikel
  listArticles: async (req, res) => {
    try {
      const { category, tags, limit = 10, page = 1 } = req.query;

      const articles = await Article.findAll({
        where: {
          category,
          tags,
        },
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
      });

      if (articles.length === 0) {
        return res.status(404).json({ 
          code: '404',
          status: 'Not Found',
          message: 'Tidak ada artikel yang sesuai dengan kriteria yang diberikan',
        });
      }

      const total = await Article.count({
        where: {
          category,
          tags,
        },
      });

      res.json({
        articles,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        code: '500',
        status: 'Internal Server Error',
        message: 'Gagal mendapatkan daftar artikel',
      });
    }
  },

  // Fungsi untuk menampilkan detail artikel
  detailArticle: async (req, res) => {
    try {
      const { id } = req.params;

      // Validasi apakah id merupakan angka yang valid
      if (isNaN(id)) {
        return res.status(400).json({
          code: '400',
          status: 'Bad Request',
          message: 'Format ID artikel tidak valid',
        });
      }

      const article = await Article.findByPk(id);

      if (!article) {
        return res.status(404).json({
          code: '404',
          status: 'Not Found',
          message: `Artikel tidak ditemukan untuk ID ${id}`,
        });
      }

      res.json({
        code: '200',
        status: 'OK',
        message: 'Detail artikel berhasil diambil',
        data: {
          id: article.id,
          title: article.title,
          content: article.content,
          category: article.category,
          tags: article.tags,
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        code: '500',
        status: 'Internal Server Error',
        message: 'Gagal mendapatkan detail artikel',
      });
    }
  },
};

module.exports = articleController;