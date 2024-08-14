const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Calendar extends Model {}

Calendar.init({
  calendarId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  alias: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  start: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  backgroundColor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'calendar'
});

module.exports = Calendar;
