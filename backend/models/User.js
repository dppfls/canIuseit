const jwt = require('jsonwebtoken');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
  generateJwt() {
    const payload = { id: this.id, email: this.email };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
}

User.init({
  googleId: DataTypes.STRING,
  naverId: DataTypes.STRING,
  email: DataTypes.STRING,
}, { sequelize, modelName: 'user' });

module.exports = User;

