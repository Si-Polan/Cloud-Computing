const { validationResult } = require('express-validator');
const ErrorResponse = require('../utils/errorResponse');
const ViolationModel = require('../models/violationModel');
const PaymentModel = require('../models/paymentModel');
const storageEngine = require('../utils/storageEngine'); // Sesuaikan dengan storage engine Anda
const multer = require('multer');
const upload = multer({ storage: storageEngine });
const proofOfPaymentModel = require('../models/proofOfPaymentModel');

exports.violationsToday = async (req, res, next) => {
  try {
    const violationsToday = await ViolationModel.getViolationsToday();

    if (violationsToday.length === 0) {
      return next(new ErrorResponse('No violations found today', 404));
    }

    // Format ulang timestamp menjadi ISO string
    const formattedViolationsToday = violationsToday.map((violation) => ({
      ...violation.toJSON(),
      timestamp: new Date(violation.timestamp).toISOString(),
    }));

    return res.status(200).json({
      code: '200',
      status: 'OK',
      message: 'Successfully fetched violations today',
      data: { violations: formattedViolationsToday },
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse('Failed to fetch violations today', 500));
  }
};


exports.latestViolations = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const violations = await ViolationModel.getLatestViolations(limit);

    if (violations.length === 0) {
      return next(new ErrorResponse('No latest violations found', 404));
    }

    // Tambahkan URL gambar ke respons
    const violationsWithImageUrls = violations.map((violation) => ({
      ...violation.toJSON(),
      imageUrl: violation.imageUrl ? `URL_BASE/${violation.imageUrl}` : null,
    }));

    return res.status(200).json({
      code: '200',
      status: 'OK',
      message: 'Successfully fetched the latest violations',
      data: { violations: violationsWithImageUrls },
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse('Failed to fetch latest violations', 500));
  }
};


exports.userViolations = async (req, res, next) => {
  try {
    const { userId, limit } = req.query;
    const violations = await ViolationModel.getUserViolations(userId, limit);

    if (violations.length === 0) {
      return next(new ErrorResponse('No violations found for the user', 404));
    }

    // Tambahkan URL gambar ke respons
    const violationsWithImageUrls = violations.map((violation) => ({
      ...violation.toJSON(),
      imageUrl: violation.imageUrl ? `URL_BASE/${violation.imageUrl}` : null,
    }));

    return res.status(200).json({
      code: '200',
      status: 'OK',
      message: 'User violations retrieved successfully',
      data: { violations: violationsWithImageUrls },
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse('Failed to fetch user violations', 500));
  }
};


exports.violationDetail = async (req, res, next) => {
  try {
    const { violationId } = req.params;

    // Dapatkan detail pelanggaran dari ViolationModel
    const violation = await ViolationModel.getViolationDetail(violationId);

    if (!violation) {
      return next(new ErrorResponse('Violation not found', 404));
    }

    // Dapatkan total biaya dari PaymentModel berdasarkan ID pelanggaran
    const totalPayment = await PaymentModel.getTotalPaymentForViolation(violationId);

    // Tambahkan URL gambar dan total biaya ke respons
    const violationWithImageUrlAndTotalPayment = {
      ...violation.toJSON(),
      imageUrl: violation.imageUrl ? `URL_BASE/${violation.imageUrl}` : null,
      totalPayment: totalPayment || 0, // Jika tidak ada pembayaran, set default ke 0
    };

    return res.status(200).json({
      code: '200',
      status: 'OK',
      message: 'Violation details retrieved successfully',
      data: { violation: violationWithImageUrlAndTotalPayment },
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse('Failed to fetch violation details', 500));
  }
};

exports.createViolation = async (req, res, next) => {
  try {
    // Menggunakan req.file untuk mendapatkan informasi file yang diupload oleh multer
    const file = req.file;

    // Lakukan operasi lain sesuai kebutuhan, misalnya menyimpan informasi gambar ke basis data

    return res.status(201).json({
      code: '201',
      status: 'Created',
      message: 'Violation created successfully',
      data: { imageUrl: `URL_BASE/${file.filename}` },
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse('Failed to create violation', 500));
  }
};

module.exports = {
  violationsToday: exports.violationsToday,
  latestViolations: exports.latestViolations,
  userViolations: exports.userViolations,
  violationDetail: exports.violationDetail,
  createViolation: exports.createViolation,
};
