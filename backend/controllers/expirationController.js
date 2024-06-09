const { Product, Category } = require('../models');

// 소비기한 계산 함수
const calculateExpiration = (manufactureDate, shelfLifeDays) => {
    const expirationDate = new Date(manufactureDate);
    expirationDate.setDate(expirationDate.getDate() + shelfLifeDays);
    return expirationDate;
};

exports.addProduct = async (req, res) => {
    try {
        const { name, manufactureDate, shelfLifeDays, category } = req.body;
        let expirationDate;

        // 사용자가 shelfLifeDays를 제공하지 않은 경우
        if (!shelfLifeDays && category) {
            const categoryInfo = await Category.findOne({ where: { name: category } });
            if (categoryInfo) {
                expirationDate = calculateExpiration(manufactureDate, categoryInfo.defaultShelfLifeDays);
            } else {
                return res.status(400).json({ error: 'Category not found and shelfLifeDays not provided.' });
            }
        } else if (shelfLifeDays) {
            expirationDate = calculateExpiration(manufactureDate, shelfLifeDays);
        } else {
            return res.status(400).json({ error: 'Either shelfLifeDays or category must be provided.' });
        }

        const product = await Product.create({ name, manufactureDate, shelfLifeDays, expirationDate, consumptionDate: expirationDate, category });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the product.' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the products.' });
    }
};
