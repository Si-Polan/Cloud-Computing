// violationModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel'); // Import model User untuk mendapatkan informasi pengguna terkait

const Violation = sequelize.define('Violation', {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleNumberPlate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

// Hubungan antara Violation dan User
Violation.belongsTo(User, { foreignKey: 'userId' });

// Sinkronisasi model dengan basis data
Violation.sync({ force: false }).then(() => {
  console.log('Violation model synced with database');
});

module.exports = Violation;
