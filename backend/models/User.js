const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class User extends Model {
  generateJwt() {
    const payload = { id: this.id };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  }

  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
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
