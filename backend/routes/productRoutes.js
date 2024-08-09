const express = require('express');
const router = express.Router();
const db = require('../config/database'); // 데이터베이스 연결 설정 파일 불러오기

router.post('/register-product', (req, res) => {
    console.log('POST /api/products/register-product request received'); // 요청 수신 로그

    const { user_id, alias, expiry_date, category_id } = req.body;

    const query = `INSERT INTO products (user_id, alias, expiry_date, category_id) VALUES (?, ?, ?, ?)`;
    db.query(query, [user_id, alias, expiry_date, category_id], (err, result) => {
        if (err) {
            console.error('Database error:', err); // 오류 메시지 출력
            return res.status(500).send('Database error');
        }

        console.log('Product information successfully saved.'); // 쿼리 성공 로그
        res.status(200).json({ success: true });
    });
});

module.exports = router;
