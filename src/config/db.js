const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sipolan', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
