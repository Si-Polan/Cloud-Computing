const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_').toLowerCase()}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image', 'video'];
  const fileType = file.mimetype.split('/')[0];

  if (allowedFileTypes.includes(fileType)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

// Export middleware
const multerMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single('file');

module.exports = multerMiddleware;
