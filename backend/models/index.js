const sequelize = require('../config/database');
const Category = require('./Category');
const User = require('./User');

const initDb = async () => {
  await sequelize.sync({ force: true });//나~중에 false로 바꿔야함
  console.log('Database synchronized');

  // Initialize with some data
  await Category.bulkCreate([
    { name: 'Dairy', shelfLifeDays: 7 },
    { name: 'Meat', shelfLifeDays: 5 },
    { name: 'Vegetables', shelfLifeDays: 10 },
  ]);
};

<<<<<<< HEAD
module.exports = { sequelize, initDb, Category, User };
=======
module.exports = { sequelize, initDb, Category };
>>>>>>> a9f0e471136dad143770fbfaeceb706b52a86db3

