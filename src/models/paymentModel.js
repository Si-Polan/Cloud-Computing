// paymentModel.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

class Payment extends Model {
  static getPaymentHistory = async function (userId) {
    try {
      const payments = await this.findAll({ where: { userId: userId } });
      return payments;
    } catch (error) {
      console.error('Error fetching payment history:', error);
      throw error; // Re-throw the error for proper handling
    }
  };
}

Payment.init(
  {
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
    invoiceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Payment',
  }
);


// Sinkronisasi model dengan basis data
Payment.sync({ force: false }).then(() => {
  console.log('Payment model synced with database');
});

// Hubungan antara Violation dan User
Payment.belongsTo(User, { foreignKey: 'userId' });

// Hubungan antara Payment dan User
Payment.belongsTo(User);

module.exports = Payment;
