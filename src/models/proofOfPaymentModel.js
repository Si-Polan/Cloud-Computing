// proofOfPaymentModel.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Payment = require('./paymentModel');

class ProofOfPayment extends Model {}

ProofOfPayment.init(
  {
    paymentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ProofOfPayment',
  }
);


// Sinkronisasi model dengan basis data
ProofOfPayment.sync({ force: false }).then(() => {
  console.log('ProofOfPayment model synced with database');
});

ProofOfPayment.belongsTo(Payment, { foreignKey: 'paymentId' });

module.exports = ProofOfPayment;
