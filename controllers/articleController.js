const Article = require('../models/articleModel');

const articleController = {
  // Fungsi untuk menampilkan daftar artikel
  listArticles: async (req, res) => {
    try {
      const { Scategory, tags, limit = 10, page = 1 } = req.body;

      const articles = await articleModel.findAll({
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
          errors: 'Tidak ada artikel yang sesuai dengan kriteria yang diberikan',
        });
      }

      const total = await articleModel.count({
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
        errors: 'Kesalahan server internal',
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
          error: 'Format ID artikel tidak valid',
        });
      }

      const article = await articleModel.findByPk(id);

      if (!article) {
        return res.status(404).json({
          code: '404',
          status: 'Not Found',
          error: `Artikel tidak ditemukan untuk ID ${id}`,
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
        errors: 'Kesalahan server internal',
      });
    }
  },
};

module.exports = articleController;
