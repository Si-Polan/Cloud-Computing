const violationController = {
  // Fungsi untuk mendapatkan pelanggaran terbaru
  latestViolations: async (req, res) => {
    try {
      // Implementasikan logika untuk mengambil pelanggaran terbaru dari basis data
      // Anda dapat menggunakan model dan query sesuai dengan setup Anda

      // Respon contoh untuk tujuan demonstrasi
      const latestViolations = [
        {
          id: 1,
          lokasi: 'Jalan Kaliurang',
          jenis: 'Tidak memakai helm',
          nomorPolisi: 'DK 2938 ACL',
          timestamp: '2023-03-01 (14:45:30)',
        },
        // Tambahkan pelanggaran lebih banyak jika diperlukan
      ];

      const response = {
        code: '200',
        status: 'OK',
        message: 'Berhasil mengambil pelanggaran terbaru',
        data: { violations: latestViolations },
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kesalahan server internal' });
    }
  },

  // Fungsi untuk mendapatkan pelanggaran pengguna
  userViolations: async (req, res) => {
    try {
      // Implementasikan logika untuk mengambil pelanggaran pengguna dari basis data
      // Anda dapat menggunakan model dan query sesuai dengan setup Anda

      // Respon contoh untuk tujuan demonstrasi
      const userViolations = [
        {
          id: 1,
          lokasi: 'Jalan Kaliurang',
          jenis: 'Tidak memakai helm',
          nomorPolisi: 'DK 2938 ACL',
          timestamp: '2023-03-01 (14:45:30)',
        },
        // Tambahkan pelanggaran lebih banyak jika diperlukan
      ];

      const response = {
        code: '200',
        status: 'OK',
        message: 'Berhasil mengambil pelanggaran pengguna',
        data: { violations: userViolations },
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kesalahan server internal' });
    }
  },

  // Fungsi untuk mendapatkan detail pelanggaran
  violationDetail: async (req, res) => {
    try {
      const violationId = req.params.violationId;

      // Implementasikan logika untuk mengambil detail pelanggaran dari basis data
      // Anda dapat menggunakan model dan query sesuai dengan setup Anda

      // Respon contoh untuk tujuan demonstrasi
      const violationDetail = {
        id: 1,
        jenis: 'Tidak memakai helm',
        nomorPolisi: 'DK 2938 ACL',
        timestamp: '2023-03-01 (14:45:30)',
        pengguna: {
          id: 'id-pengguna-spesifik',
          fullname: 'Bimo',
        },
      };

      const response = {
        code: '200',
        status: 'OK',
        message: 'Berhasil mengambil detail pelanggaran',
        data: violationDetail,
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kesalahan server internal' });
    }
  },
};

module.exports = violationController;
