const express = require('express');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRoutes = require('./src/routes/auth');
const articles = require('./src/routes/articles');
const articlesDetail = require('./src/routes/articleDetail');
const violationsRoutes = require('./src/routes/violations');
const paymentRoutes = require('./src/routes/payment');
const helpRoutes = require('./src/routes/help');
const uploadRouter = require('./src/uploads/uploadRouter');

const app = express();

// Middleware untuk logging menggunakan morgan
app.use(logger('dev'));

// Middleware untuk parsing body dari request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware untuk parsing cookie
app.use(cookieParser());

// Middleware untuk menyajikan file statis
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk upload file menggunakan multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Gunakan Multer di endpoint tertentu
app.post('/api/upload', upload.single('file'), (req, res) => {
  const fileType = req.file.mimetype.split('/')[0]; // Mendapatkan jenis file (photo atau video)

  if (fileType === 'image') {
    // Proses unggahan foto
    const photoPath = req.file.path;
    res.json({ message: 'Photo uploaded successfully', filePath: photoPath });
  } else if (fileType === 'video') {
    // Proses unggahan video
    const videoPath = req.file.path;
    res.json({ message: 'Video uploaded successfully', filePath: videoPath });
  } else {
    // Jenis file tidak didukung
    res.status(400).json({ error: 'Unsupported file type' });
  }
});

// Gunakan Router untuk setiap bagian aplikasi
app.use('/auth', authRoutes);
app.use('/articles', articles);
app.use('/articles/detail', articlesDetail);
app.use('/violations', violationsRoutes);
app.use('/payment', paymentRoutes);
app.use('/help', helpRoutes);
app.use('/uploads', uploadRouter);

module.exports = app;
