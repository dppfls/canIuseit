const express = require('express');
const router = express.Router();
const expirationController = require('../controllers/expirationController');
const jwt = require('jsonwebtoken');

// JWT 인증 미들웨어
const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// 제품 추가 라우트
// POST /products
// 요청 본문에 제품 정보를 담아 요청
router.post('/products', authenticateJwt, expirationController.addProduct);

// 제품 조회 라우트
// GET /products
// 모든 제품 정보를 반환
router.get('/products', authenticateJwt, expirationController.getProducts);

// 사용자 정보 반환 라우트
router.get('/user', authenticateJwt, (req, res) => {
  res.json(req.user);
});

module.exports = router;

