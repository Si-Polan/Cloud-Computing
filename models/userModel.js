// models/userModel.js

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config[process.env.NODE_ENV].database, config[process.env.NODE_ENV].username, config[process.env.NODE_ENV].password, {
    host: config[process.env.NODE_ENV].host,
    dialect: config[process.env.NODE_ENV].dialect,
  });

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
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sinkronisasi model dengan basis data
User.sync({ force: false }).then(() => {
  console.log('User model synced with database');
});

module.exports = User;
