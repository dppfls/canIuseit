const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
         // 데이터베이스에서 모든 제품 조회
         const products = await Product.findAll();
         console.log('Products retrieved:', products); // 로그를 추가하여 데이터 확인
         
        res.render('look', { products: products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.render('look', { products: [] });
    }
});

module.exports = router;
