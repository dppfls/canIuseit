const express = require('express');
const router = express.Router();
const expirationController = require('../controllers/expirationController');

// 제품 추가
router.post('/products', expirationController.addProduct);

// 제품 조회
router.get('/products', expirationController.getProducts);

module.exports = router;
