const { Category } = require('../models');

const calculateExpirationDate = async (req, res) => {
  const { openDate, categoryName } = req.body;

  try {
    const category = await Category.findOne({ where: { name: categoryName } });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const expirationDate = new Date(openDate);
    expirationDate.setDate(expirationDate.getDate() + category.shelfLifeDays);

    res.json({ expirationDate: expirationDate.toISOString().split('T')[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { calculateExpirationDate };
