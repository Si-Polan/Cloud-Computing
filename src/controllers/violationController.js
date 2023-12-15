// violationController.js
const { validationResult } = require('express-validator');
const ErrorResponse = require('../utils/errorResponse'); // Import errorResponse

// Import model atau operasi database yang diperlukan
const ViolationModel = require('../models/violationModel');

// Mendapatkan daftar pelanggaran terbaru
exports.latestViolations = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const violations = await ViolationModel.getLatestViolations(limit);

    if (violations.length === 0) {
      return next(new ErrorResponse('No latest violations found', 404));
    }

    return res.status(200).json({
      code: '200',
      status: 'OK',
      message: 'Successfully fetched the latest violations',
      data: { violations },
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse('Failed to fetch latest violations', 500));
  }
};

// Mendapatkan daftar pelanggaran oleh pengguna tertentu
exports.userViolations = async (req, res, next) => {
  try {
    const { userId, limit } = req.query;
    const violations = await ViolationModel.getUserViolations(userId, limit);

    if (violations.length === 0) {
      return next(new ErrorResponse('No violations found for the user', 404));
    }

    return res.status(200).json({
      code: '200',
      status: 'OK',
      message: 'User violations retrieved successfully',
      data: { violations },
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse('Failed to fetch user violations', 500));
  }
};

// Mendapatkan detail pelanggaran berdasarkan ID
exports.violationDetail = async (req, res, next) => {
  try {
    const { violationId } = req.params;
    const violation = await ViolationModel.getViolationDetail(violationId);

    if (!violation) {
      return next(new ErrorResponse('Violation not found', 404));
    }

    return res.status(200).json({
      code: '200',
      status: 'OK',
      message: 'Violation details retrieved successfully',
      data: { violation },
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse('Failed to fetch violation details', 500));
  }
};

module.exports = {
  latestViolations: exports.latestViolations,
  userViolations: exports.userViolations,
  violationDetail: exports.violationDetail,
};
