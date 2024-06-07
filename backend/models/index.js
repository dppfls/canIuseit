const sequelize = require('../config/database');
const Category = require('./Category');

const initDb = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synchronized');
  
  // Initialize with some data
  await Category.bulkCreate([
    { name: 'Dairy', shelfLifeDays: 7 },
    { name: 'Meat', shelfLifeDays: 5 },
    { name: 'Vegetables', shelfLifeDays: 10 },
  ]);
};

module.exports = { sequelize, initDb, Category };
