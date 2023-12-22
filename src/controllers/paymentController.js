const { v4: uuidv4 } = require('uuid');
const multer = require('multer'); // Tambahkan baris ini untuk mengimpor modul multer
const paymentModel = require('../models/paymentModel');
const proofOfPaymentModel = require('../models/proofOfPaymentModel');
const storageEngine = require('../utils/storageEngine');
const upload = multer({ storage: storageEngine });

const violationModel = require('../models/violationModel');

const paymentHistory = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({
          code: 400,
          status: "Bad Request",
          errors: "Missing required userId parameter",
      });
}
    const limit = req.query.limit || 5;

    // Memanggil fungsi pada model untuk mendapatkan riwayat pembayaran
    const payments = await paymentModel.getPaymentHistory(userId,limit);

    // Memanggil fungsi pada violationController untuk mendapatkan informasi pelanggaran
    const violationDetails = await violationModel.getUserViolations(userId,limit);

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Payment history retrieved successfully",
      data: {
        payments,
        violationDetails,
      },
    });
  } catch (error) {
    console.error('Error in paymentHistory:', error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      errors: "Something went wrong",
    });
  }
};

const paymentMethod = async (req, res) => {
  try {
    // Memanggil fungsi pada model untuk mendapatkan metode pembayaran
    const paymentMethods = await paymentModel.getPaymentMethods();

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Payment methods retrieved successfully",
      data: {
        payment_methods: paymentMethods,
      },
    });
  } catch (error) {
    console.error('Error in paymentMethod:', error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      errors: "Something went wrong",
    });
  }
};

const processPayment = async (req, res) => {
  try {
    const userId = req.body.userId;
    const invoiceId = req.body.invoiceId;
    const methodId = req.body.methodId;

    // Validasi data
    if (!userId || !invoiceId || !methodId) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        errors: "Invalid payment request. Please check the details and try again.",
      });
    }

    // Fungsi untuk mendapatkan informasi pembayaran (misalnya, kode virtual account)
    function generatePaymentInfo() {
      // Menghasilkan kode virtual account secara acak
      const virtualAccount = Math.floor(Math.random() * 1000000000000).toString();
      return {
        amount: '100000', // Ganti dengan jumlah pembayaran yang benar
        manualMethod: 'Virtual Account',
        virtualAccount,
      };
    }

    // Mendapatkan informasi pembayaran
    const paymentInfo = generatePaymentInfo();

    // Menyimpan transaksi pembayaran ke tabel Payment
    const savedTransaction = await paymentModel.createPayment({
      userId,
      amount: paymentInfo.amount,
      timestamp: new Date(),
      status: 'Pending', // Atur status sesuai dengan kebutuhan
      manualMethod: paymentInfo.manualMethod,
      transactionId: uuidv4(),
    });

    // Langkah konfirmasi pembayaran (contoh: mengunggah bukti pembayaran)
    if (req.body.proofOfPayment) {
      // Menggunakan Sequelize untuk menyimpan bukti pembayaran
      await savedTransaction.createProofOfPayment({
        filePath: req.body.proofOfPayment,
      });
      console.log('Proof of payment uploaded successfully.');
    }

    res.status(201).json({
      code: 201,
      status: "Created",
      message: "Pembayaran Berhasil",
      data: {
        transactionId: savedTransaction.transactionId,
        paymentInfo,
      },
    
    });
  } catch (error) {
    console.error('Error in processPayment:', error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      errors: "Something went wrong",
    });
  }
};
  
module.exports = {
  paymentHistory,
  paymentMethod,
  processPayment,
};
