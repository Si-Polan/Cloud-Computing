// helpModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel'); // Ganti alias User dengan UserModel

const HelpCategory = sequelize.define('HelpCategory', {
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sinkronisasi model dengan basis data
HelpCategory.sync({ force: false }).then(() => {
  console.log('Help model synced with database');
});

// Hubungan antara Article dan User
HelpCategory.belongsTo(User);

module.exports = HelpCategory;