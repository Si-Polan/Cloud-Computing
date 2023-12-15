// /models/articleModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Article = sequelize.define('Article', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },  
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

// Sinkronisasi model dengan basis data
Article.sync({ force: false }).then(() => {
  console.log('Article model synced with database');
});

// Hubungan antara Article dan User
Article.belongsTo(User);

module.exports = Article;
