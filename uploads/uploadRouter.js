const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Endpoint untuk unggahan file (foto atau video)
router.post('/upload', upload.single('file'), (req, res) => {
  const fileType = req.file.mimetype.split('/')[0]; // Mendapatkan jenis file (photo atau video)

  if (fileType === 'image' || fileType === 'video') {
    // Proses unggahan file
    const filePath = req.file.path;
    res.json({ message: 'File uploaded successfully', filePath, fileType });
  } else {
    // Jenis file tidak didukung
    res.status(400).json({ error: 'Unsupported file type' });
  }
});

module.exports = router;
