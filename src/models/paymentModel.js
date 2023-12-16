// paymentModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Payment = sequelize.define('Payment', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  manualMethodId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const ProofOfPayment = sequelize.define('ProofOfPayment', {
  paymentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING, // Sesuaikan dengan tipe data yang sesuai
    allowNull: false,
  },
});

Payment.hasOne(ProofOfPayment, { foreignKey: 'paymentId' });
ProofOfPayment.belongsTo(Payment, { foreignKey: 'paymentId' });

// Sinkronisasi model dengan basis data
sequelize.sync({ force: false }).then(() => {
  console.log('Models synced with database');
});

module.exports = { Payment, ProofOfPayment };
