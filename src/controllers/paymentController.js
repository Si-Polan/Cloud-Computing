// paymentController.js

const paymentModel = require('../models/paymentModel');

const paymentHistory = (req, res) => {
  const userId = req.query.userId;
  const limit = req.query.limit || 5;

  // Memanggil fungsi pada model untuk mendapatkan riwayat pembayaran
  const payments = paymentModel.getPaymentHistory(userId, limit);

  res.status(200).json({
    code: "200",
    status: "OK",
    message: "Payment history retrieved successfully",
    data: {
      payments: payments
    }
  });
};

const paymentMethod = (req, res) => {
  // Memanggil fungsi pada model untuk mendapatkan metode pembayaran
  const paymentMethods = paymentModel.getPaymentMethods();

  res.status(200).json({
    code: "200",
    status: "OK",
    message: "Payment methods retrieved successfully",
    data: {
      payment_methods: paymentMethods
    }
  });
};

const processPayment = (req, res) => {
  const userId = req.body.userId;
  const invoiceId = req.body.invoiceId;
  const methodId = req.body.methodId;

  // Validasi data
  if (!userId || !invoiceId || !methodId) {
    return res.status(400).json({
      code: "400",
      status: "Bad Request",
      errors: "Invalid payment request. Please check the details and try again."
    });
  }

  const transactionId = uuidv4();

  // Memanggil fungsi pada model untuk menyimpan transaksi pembayaran
  const savedTransaction = paymentModel.savePaymentTransaction(userId, invoiceId, methodId, transactionId);

  res.status(201).json({
    code: "201",
    status: "Created",
    message: "Pembayaran Berhasil",
    data: {
      transactionId: transactionId
    }
  });
};

module.exports = {
  paymentHistory,
  paymentMethod,
  processPayment
};
