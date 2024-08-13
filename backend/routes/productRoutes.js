const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // Category 모델 불러오기
const Product = require('../models/Product');   // Product 모델 불러오기

router.post('/register-product', async (req, res) => {
    try {
        console.log('POST /api/products/register-product request received');
        console.log('Request body:', req.body);

        // 로그가 안 출력되는 부분을 확인하기 위한 로그
        console.log('Starting categoryId parsing process');
        
        const { alias, expiry_date, category_id } = req.body;

        console.log('category_id before parsing:', category_id);

        // category_id를 숫자로 변환
        const parsedCategoryId = parseInt(category_id, 10); 
        console.log('Parsed category_id:', parsedCategoryId);

        // 카테고리 ID가 유효한지 확인
        const category = await Category.findByPk(parsedCategoryId);
        console.log('Category found:', category);

        if (!category) {
            console.log('Invalid category ID:', parsedCategoryId);
            return res.status(400).json({ success: false, message: 'Invalid category ID' });
        }

        // 새로운 제품을 products 테이블에 추가
        const newProduct = await Product.create({
            alias: alias,
            expiry_date: expiry_date,
            category_id: category.categoryId // 외래 키로 categoryId 사용
        });

        console.log('New product saved:', newProduct);
        console.log('Product information successfully saved.');

        res.status(200).json({ success: true, product: newProduct });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ success: false, message: 'Database error', error: err });
    }
});

module.exports = router;
