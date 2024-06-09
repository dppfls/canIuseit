const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    manufactureDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    shelfLifeDays: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    consumptionDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = Product;
