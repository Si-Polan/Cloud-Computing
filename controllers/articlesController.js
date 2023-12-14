const articlesController = {
  // Fungsi untuk mendapatkan daftar artikel
  listArticles: async (req, res) => {
    try {
      // Implementasikan logika untuk mengambil artikel dari basis data
      // Anda dapat menggunakan model dan query sesuai dengan setup Anda

      // Respon contoh untuk tujuan demonstrasi
      const articles = [
        {
          id: 1,
          title: 'Judul Artikel 1',
          category: 'berita',
          tags: ['keamanan'],
          content: 'isi kontennya ya...',
          published_at: 'waktu_publikasi',
        },
        {
          id: 2,
          title: 'Judul Artikel 2',
          category: 'mobil',
          tags: ['keuangan'],
          content: 'isi kontennya yaaa...',
          published_at: 'waktu_publikasi',
        },
        // Tambahkan artikel lebih banyak jika diperlukan
      ];

      const response = {
        articles,
        total: articles.length,
        page: 1,
        limit: 10,
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kesalahan server internal' });
    }
  },

  // Fungsi untuk membagikan artikel
  shareArticle: async (req, res) => {
    try {
      const { articleId, platform } = req.body;

      // Implementasikan logika untuk membagikan artikel
      // Anda dapat menggunakan model dan query sesuai dengan setup Anda

      // Respon contoh untuk tujuan demonstrasi
      const shareUrl = `https://contoh.com/artikel/${articleId}/bagikan/${platform}`;

      res.json({
        code: '200',
        status: 'OK',
        message: 'Artikel berhasil dibagikan',
        data: { shareUrl },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kesalahan server internal' });
    }
  },
};

module.exports = articlesController;
