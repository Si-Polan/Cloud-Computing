const Violation = require('../models/violationModel');
const Article = require('../models/articleModel');
const ProofOfPayment = require('../models/proofOfPaymentModel');
const ErrorResponse = require('../utils/errorResponse');

exports.uploadFile = async (req, res, next) => {
  try {
    const fileType = req.file.mimetype.split('/')[0];
    let model, modelName;

    // Tentukan model berdasarkan jenis file
    switch (fileType) {
      case 'image':
        model = Article;
        modelName = 'Article';
        break;
      case 'video':
        model = Violation;
        modelName = 'Violation';
        break;
      // Tambahkan jenis file lain jika diperlukan

      default:
        return next(new ErrorResponse('Unsupported file type', 400));
    }

    const filePath = req.file.path;

    // Simpan informasi ke basis data
    const item = await model.create({
      description: req.body.description,
      type: req.body.type,
      // Tambahkan field lain jika diperlukan
      // ...
      timestamp: new Date(),
      userId: req.body.userId,
      imageUrl: `URL_BASE/${filePath}`, // Ganti 'URL_BASE' sesuai kebutuhan Anda
    });

    res.json({
      message: `${modelName} uploaded successfully`,
      filePath: filePath,
      itemId: item.id,
    });
  } catch (error) {
    console.error('Error in file upload:', error);
    next(new ErrorResponse('Internal Server Error', 500));
  }
};
