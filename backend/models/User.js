const jwt = require('jsonwebtoken');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
  generateJwt() {
    const payload = { id: this.id, email: this.email };
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
  googleId: DataTypes.STRING,
  naverId: DataTypes.STRING,
  email: DataTypes.STRING,
}, { sequelize, modelName: 'user' });

module.exports = User;

