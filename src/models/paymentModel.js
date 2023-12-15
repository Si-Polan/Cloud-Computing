// paymentModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Payment = sequelize.define('Payment', {
  invoiceId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER, // Sesuaikan dengan tipe data yang sesuai dengan ID pengguna di model User
    allowNull: false,
  },
  methodId: {
    type: DataTypes.STRING, // Sesuaikan dengan tipe data yang sesuai dengan ID metode pembayaran
    allowNull: false,
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sinkronisasi model dengan basis data
Payment.sync({ force: false }).then(() => {
  console.log('Payment model synced with database');
});

module.exports = Payment;
