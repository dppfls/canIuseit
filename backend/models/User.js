const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
}

User.init({
  googleId: {
    type: DataTypes.STRING,
    unique: true,
  },
  naverId: {
    type: DataTypes.STRING,
    unique: true,
  },
  provider: {
    type: DataTypes.STRING,
    },  // provider 필드 추가
  username: {
    type: DataTypes.STRING,
  }
  
}, { sequelize, modelName: 'user' });

module.exports = User;
