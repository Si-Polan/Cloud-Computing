const express = require('express');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const authRoutes = require('./routes/auth');
const articlesRoutes = require('./routes/articles');
const violationsRoutes = require('./routes/violations');
const paymentRoutes = require('./routes/payment');

// Import file router yang berisi endpoint untuk unggahan
const uploadRouter = require('./uploads/uploadRouter');

const app = express();

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
  

app.use('/auth', authRoutes);
app.use('/articles', articlesRoutes);
app.use('/violations', violationsRoutes);
app.use('/payment', paymentRoutes);
app.use('/uploads', uploadRouter);

module.exports = app;
