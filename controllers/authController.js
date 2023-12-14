const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel'); // Mengimport model pengguna

const authController = {
  // Fungsi untuk mendaftarkan pengguna baru
  signup: async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
      // Melakukan hash terhadap password sebelum disimpan
      const hashedPassword = await bcrypt.hash(password, 10);
      // Menyimpan pengguna di basis data
      const newUser = await UserModel.create({ fullname, email, password: hashedPassword });
      res.json({ message: 'Pengguna berhasil mendaftar', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kesalahan server internal' });
    }
  },

  // Fungsi untuk masuk/log masuk pengguna
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Mencari pengguna berdasarkan email di basis data
      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Email atau password tidak valid' });
      }

      // Membandingkan password yang diberikan dengan password yang di-hash yang disimpan
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Email atau password tidak valid' });
      }

      // TODO: Menghasilkan dan mengirimkan token untuk otentikasi
      res.json({ message: 'Pengguna berhasil masuk', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kesalahan server internal' });
    }
  },

  // Fungsi otentikasi lainnya seperti resetPassword, verifyAccount, dll.

  // Fungsi untuk mengedit akun pengguna
  editAccount: async (req, res) => {
    try {
      const { userId, newFullName, newPassword } = req.body;
      // Mencari pengguna berdasarkan ID di basis data
      const user = await UserModel.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
      }

      // Memperbarui detail pengguna
      if (newFullName) {
        user.fullname = newFullName;
      }

      if (newPassword) {
        // Melakukan hash terhadap password baru sebelum memperbarui
        user.password = await bcrypt.hash(newPassword, 10);
      }

      // Menyimpan pengguna yang diperbarui di basis data
      await user.save();

      res.json({ message: 'Detail pengguna berhasil diperbarui', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kesalahan server internal' });
    }
  },
};

module.exports = authController;
