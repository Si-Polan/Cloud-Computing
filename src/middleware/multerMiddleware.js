const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Middleware untuk upload file menggunakan multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image', 'video'];
  const fileType = file.mimetype.split('/')[0];

  if (allowedFileTypes.includes(fileType)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
});

// Endpoint untuk pengunggahan file
router.post('/upload', upload.single('file'), (req, res) => {
  const fileType = req.file.mimetype.split('/')[0];

  if (fileType === 'image') {
    const photoPath = req.file.path;
    res.json({ message: 'Photo uploaded successfully', filePath: photoPath });
  } else if (fileType === 'video') {
    const videoPath = req.file.path;
    res.json({ message: 'Video uploaded successfully', filePath: videoPath });
  } else {
    res.status(400).json({ error: 'Unsupported file type' });
  }
});

module.exports = router;
