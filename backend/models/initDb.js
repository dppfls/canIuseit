
const sequelize = require('../config/database');
const Category = require('./Category');
const User = require('./User');
const Product = require('./Product');

const initDb = async () => {
  await sequelize.sync({ force: false });
  console.log('Database synchronized');

  // 카테고리별 소비기한 기준 데이터 초기화 // 이거 우리 카테고리 번호로 해야하는거잖아..!! -준희
  /*await Category.bulkCreate([
    { name: 'Dairy', shelfLifeDays: 7 },
    { name: 'Meat', shelfLifeDays: 5 },
    { name: 'Vegetables', shelfLifeDays: 10 },
      
  ]);*/

  await Category.bulkCreate([
    { categoryId: 100, name: '화장품', shelfLifeDays: null},
    { categoryId: 101, name: '기초 화장품', shelfLifeDays: 365},
    { categoryId: 102, name: '클렌저', shelfLifeDays: 365},
    { categoryId: 103, name: '선크림', shelfLifeDays: 180},
    { categoryId: 200, name: '의약품', shelfLifeDays: null},
    { categoryId: 300, name: '식품', shelfLifeDays: null},
    { categoryId: 400, name: '기타', shelfLifeDays: null}
  ], { ignoreDuplicates: true });  // 중복된 항목 무시
};

module.exports = { sequelize, initDb, Category, User, Product };