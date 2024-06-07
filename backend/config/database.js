const { Sequelize } = require('sequelize');

// 변경해야할 것 같음!
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',  
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
