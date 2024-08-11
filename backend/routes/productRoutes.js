const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');
const Category = require('../models/Category'); // Category 모델 불러오기
const Product = require('../models/Product');   // Product 모델 불러오기

router.post('/register-product', async (req, res) => {
    try {
        console.log('POST /api/products/register-product request received');
        
        const { alias, expiry_date, category_id } = req.body;

        // 카테고리 ID가 유효한지 확인
        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(400).json({ success: false, message: 'Invalid category ID' });
        }

        // 새로운 제품을 products 테이블에 추가
        const newProduct = await Product.create({
            alias: alias,
            expiry_date: expiry_date,
            category_id: category.id // 외래 키로 category ID 사용
        });

        console.log('Product information successfully saved.');
        res.status(200).json({ success: true, product: newProduct });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ success: false, message: 'Database error', error: err });
    }
});

module.exports = router;
