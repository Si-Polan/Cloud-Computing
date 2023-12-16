const express = require('express');
const multer = require('multer');
const path = require('path');
const Violation = require('../models/violationModel');
const User = require('../models/userModel'); // Pastikan path-nya benar

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

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileType = req.file.mimetype.split('/')[0];
    
    if (fileType === 'image') {
      const photoPath = req.file.path;

      // Simpan informasi pelanggaran ke basis data
      const violation = await Violation.create({
        description: req.body.description,
        type: req.body.type,
        vehicleNumberPlate: req.body.vehicleNumberPlate,
        timestamp: new Date(),
        userId: req.body.userId, // Pastikan userId diset sesuai dengan informasi pengguna yang sedang terautentikasi
        filePath: photoPath,
      });

      res.json({ message: 'Photo uploaded successfully', filePath: photoPath, violationId: violation.id });
    } else {
      res.status(400).json({ error: 'Unsupported file type' });
    }
  } catch (error) {
    console.error('Error in file upload:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong',
    });
  }
});

module.exports = router;
