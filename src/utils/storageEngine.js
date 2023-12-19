const { Storage } = require('@google-cloud/storage');
const path = require('path');
const multerGoogleStorage = require('multer-google-storage');

const storage = new Storage({
  projectId: 'YOUR_PROJECT_ID',
  keyFilename: 'path/to/your/keyfile.json', // Ganti dengan path yang sesuai
});

const bucketName = 'YOUR_BUCKET_NAME';

const googleStorage = multerGoogleStorage.storageEngine({
  bucket: bucketName,
  projectId: 'YOUR_PROJECT_ID',
  keyFilename: 'path/to/your/keyfile.json', // Ganti dengan path yang sesuai
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + '-' + path.basename(file.originalname));
  },
});

module.exports = googleStorage;



// Apabila menggunakan penyimpanan Google Cloud Storage, pastikan juga bahwa proyek Anda sudah memiliki kunci JSON (JSON key) yang dapat digunakan dan memiliki izin yang cukup untuk mengakses Google Cloud Storage. Juga, pastikan bahwa paket @google-cloud/storage dan multer-google-storage telah diinstal.