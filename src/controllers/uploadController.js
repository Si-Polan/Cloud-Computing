const articleModel = require('../models/articleModel');
const violationModel = require('../models/violationModel');
const proofOfPaymentModel = require('../models/proofOfPaymentModel');
const ErrorResponse = require('../utils/errorResponse');

exports.uploadFile = async (req, res, next) => {
  try {
    let model, modelName;

    // Tentukan model berdasarkan endpoint atau jenis file
    switch (req.baseUrl) {
      case '/articles':
        model = articleModel;
        modelName = 'Article';
        break;
      case '/violations':
        model = violationModel;
        modelName = 'Violation';
        break;
      case '/proof-of-payment':
        model = proofOfPaymentModel;
        modelName = 'Proof of Payment';
        break;
      // Tambahkan endpoint lain jika diperlukan
      default:
        return next(new ErrorResponse('Unsupported endpoint', 400));
    }

    const filePath = req.file.path;

    // Simpan informasi ke basis data
    const item = await model.create({
      description: req.body.description,
      type: req.body.type,
      timestamp: new Date(),
      userId: req.body.userId,
      imageUrl: filePath, // Simpan nama file saja, tidak perlu URL_BASE
    });

    res.json({
      message: `${modelName} image uploaded successfully`,
      filePath: filePath,
      itemId: item.id,
    });
  } catch (error) {
    console.error('Error in file upload:', error);
    next(new ErrorResponse('Internal Server Error', 500));
  }
};
