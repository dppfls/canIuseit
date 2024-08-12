const express = require('express');
const router = express.Router();
//const Product = require('../models/Product'); 
const Category = require('../models/Category');

// /look 경로를 처리하는 라우트
router.get('/look', async (req, res) => {
    try {
        console.log("look");
        //const products = await Product.findAll();
                // 예제 데이터를 직접 추가
                const products = [
                    { alias: "Test Product 1", expiry_date: "2025-01-01" },
                    { alias: "Test Product 2", expiry_date: "2024-12-31" }
                ];
        console.log("Fetched products:", products); // 제품 데이터를 로그로 출력
        res.render('look', { products: products || [] }); // products 변수가 비어 있을 경우
    } catch (error) {
        console.error("Error fetching products:", error);
        res.render('look', { products: [] }); // 오류 발생 시에도 빈 배열을 전달
        res.status(500).send('Server Error');
    }
});

module.exports = router;
