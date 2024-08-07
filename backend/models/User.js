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
  username: {
    type: DataTypes.STRING,
  }
}, { sequelize, modelName: 'user' });

module.exports = User;
