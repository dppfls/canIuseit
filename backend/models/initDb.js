const sequelize = require('../config/database');
const Category = require('./Category');
const User = require('./User');
const Product = require('./Product');

const initDb = async () => {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');

    // 카테고리별 소비기한 기준 데이터 초기화
    await Category.bulkCreate([
        { name: 'Dairy', defaultShelfLifeDays: 7 },
        { name: 'Meat', defaultShelfLifeDays: 5 },
        { name: 'Vegetables', defaultShelfLifeDays: 10 },
        // 추가 카테고리 데이터를 여기 추가
    ]);
};

module.exports = { sequelize, initDb, Category, User, Product };
