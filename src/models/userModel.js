// models/userModel.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Menggunakan instance sequelize yang sama

const User = sequelize.define('User', {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Invalid email format' },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleNumberPlate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sinkronisasi model dengan basis data
User.sync({ force: false }).then(() => {
  console.log('User model synced with database');
});

module.exports = User;
