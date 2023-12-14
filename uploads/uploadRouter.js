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

// Endpoint untuk unggahan file (foto atau video) dan nomor plat
router.post('/upload', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'licensePlate', maxCount: 1 }]), (req, res) => {
  const photoOrVideo = req.files['file'][0];
  const licensePlate = req.files['licensePlate'][0];
  
  // Proses unggahan file
  const photoOrVideoPath = photoOrVideo.path;
  const licensePlatePath = licensePlate.path;

  res.json({
    message: 'Files uploaded successfully',
    photoOrVideo: { filePath: photoOrVideoPath, fileType: photoOrVideo.mimetype.split('/')[0] },
    licensePlate: { filePath: licensePlatePath, fileType: licensePlate.mimetype.split('/')[0] }
  });
});

module.exports = router;
