const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ensureAuthenticated는 사용자가 로그인했는지 확인하는 미들웨어 (예시)
const { ensureAuthenticated } = require('../middleware/authMid');

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user.userId; // 현재 로그인된 사용자의 userId 가져오기
        console.log(`Logged in userId: ${userId}`);

        // 로그인된 사용자가 저장한 제품만 가져오기
        const products = await Product.findAll({
            where: { userId: userId } // userId로 필터링
        });

        console.log('Products retrieved:', products); // 로그를 추가하여 데이터 확인

        res.render('look', { products: products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.render('look', { products: [] });
    }
});

module.exports = router;
