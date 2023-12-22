const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const authController = {
  // Fungsi untuk mendaftarkan pengguna baru
  signup: async (req, res) => {
    try {
      const { fullname, email, vehicle_number_plate, password, otp, status } = req.body.data;

      const existingUser = await UserModel.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ code: '409', status: 'conflict', errors: 'Email sudah terdaftar' });
      }

      const newUser = await UserModel.create({ fullname, email,  vehicle_number_plate, password, otp, status });

      // Menghasilkan token untuk pengguna yang baru terdaftar
      const token = jwt.sign({ userId: newUser.id, email: newUser.email }, 'your-secret-key', { expiresIn: '1h' });

      res.status(201).json({
        code: '201',
        status: 'Created',
        message: 'Pendaftaran berhasil',
        data: { token },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ code: '500', status: 'Internal Server Error', errors: 'Kesalahan server internal' });
    }
  },

  // Fungsi untuk masuk (login) pengguna
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ code: '401', status: 'Unauthorized', errors: 'Email atau password salah' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ code: '401', status: 'Unauthorized', errors: 'Email atau password salah' });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

      res.json({
        code: '200',
        status: 'OK',
        message: 'Masuk berhasil',
        data: {
          token,
          user: {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
          },
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ code: '500', status: 'Internal Server Error', errors: 'Kesalahan server internal' });
    }
  },

  // Fungsi untuk mengganti kata sandi pengguna
  changePasswordHandler: async (req, res) => {
    try {
      const { email, old_password, new_password, confirm_new_password } = req.body;
      const user = await UserModel.findOne({ where: { email } });

      // Periksa apakah kata sandi lama cocok
      const passwordMatch = await bcrypt.compare(old_password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ code: '401', status: 'Unauthorized', errors: 'Kata sandi lama salah' });
      }

      // Periksa apakah kata sandi baru dan konfirmasi kata sandi baru cocok
      if (new_password !== confirm_new_password) {
        return res.status(400).json({ code: '400', status: 'Bad Request', errors: 'Konfirmasi kata sandi baru tidak cocok' });
      }

      // Enkripsi dan simpan kata sandi baru
      const hashedNewPassword = await bcrypt.hash(new_password, 10);
      user.password = hashedNewPassword;
      await user.save();

      res.json({
        code: '200',
        status: 'OK',
        message: 'Kata sandi berhasil diubah',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ code: '500', status: 'Internal Server Error', errors: 'Kesalahan server internal' });
    }
  },

 // Fungsi untuk memverifikasi akun pengguna menggunakan OTP
 verifyAccountHandler: async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await UserModel.findOne({ where: { email } });

    if (!user || otp !== user.otp) {
      return res.status(422).json({ code: '422', status: 'Unprocessable Entity', message: 'Kode OTP tidak valid', details: 'Silakan masukkan kode OTP yang valid.' });
    }

    // Set status user menjadi 'verified'
    user.status = 'verified';
    await user.save();

    res.json({
      code: '200',
      status: 'OK',
      message: 'Verifikasi berhasil',
    });
  } catch (error) {
    console.error(error);
    res.status(422).json({ code: '422', status: 'Unprocessable Entity', message: 'Kode OTP tidak valid', details: 'Silakan masukkan kode OTP yang valid.' });
  }
},

// Fungsi untuk mengirim ulang kode OTP
resendOTPHandler: async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ code: '404', status: 'Not Found', message: 'Pengguna tidak ditemukan' });
    }

    // Logika untuk mengirim ulang kode OTP
    // Misalnya, Anda menghasilkan kode OTP baru dan mengirimkannya ke pengguna
    const newOTP = generateNewOTP(); // Fungsi generateNewOTP harus diimplementasikan sesuai kebutuhan
    user.otp = newOTP;
    await user.save();

    res.json({
      code: '200',
      status: 'OK',
      message: 'Kode OTP berhasil dikirim ulang',
    });
  } catch (error) {
    console.error(error);
    res.status(422).json({ code: '422', status: 'Unprocessable Entity', message: 'Gagal mengirim ulang kode OTP', details: 'Silakan coba lagi nanti.' });
  }
},

// Fungsi untuk mengedit detail akun pengguna
editAccount: async (req, res) => {
  try {
    const { token, data } = req.body;

    // Logika untuk mengedit detail akun pengguna

    res.json({
      code: '200',
      status: 'OK',
      message: 'Akun berhasil diperbarui',
      data: {
        updatedFields: ["fullname", "email"],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ code: '401', status: 'Unauthorized', errors: 'Token tidak valid atau telah kedaluwarsa' });
  }
},
};

module.exports = authController;