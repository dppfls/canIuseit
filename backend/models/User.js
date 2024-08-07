const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // database 설정 파일 경로

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  naverId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePhoto: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = User;
