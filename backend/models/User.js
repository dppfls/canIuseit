// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // 나중에 다시 경로 확인

const User = sequelize.define('User', {
  googleId: {
    type: DataTypes.STRING,
    unique: true
  },
  naverId: {
    type: DataTypes.STRING,
    unique: true
  },
  // 추가적으로 사용자 정보 정의 가능
});

module.exports = User;

