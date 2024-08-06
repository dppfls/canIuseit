const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureAuthenticated } = require('../middleware/authMid'); // ensureAuthenticated로 변경

// Google 로그인 라우트
router.get('/google', authController.googleLogin);
router.get('/google/callback',
  authController.googleCallback,
  authController.googleCallbackSuccess
);

// 보호된 라우트 예시
router.get('/protected', ensureAuthenticated, (req, res) => { // ensureAuthenticated로 변경
  res.send('This is a protected route');
});

// Naver 로그인 라우트
router.get('/naver', authController.naverLogin);

router.get('/naver/callback',
  authController.naverCallback,
  authController.naverCallbackSuccess
);

module.exports = router;
