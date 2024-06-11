const { Sequelize } = require('sequelize');
/*
require('dotenv').config();
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  logging: false,
});
*/

const sequelize = new Sequelize('canIuseit_db', 'canI', 'cancanii!', {
    host: 'localhost',
	port: 3306,
	dialect: 'mysql'
});

module.exports = sequelize;
