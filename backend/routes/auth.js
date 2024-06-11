const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');

exports.authenticateJwt = (req, res, next) => {
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

// Google 로그인 라우트
router.get('/google', authController.googleLogin);

router.get('/google/callback',
  authController.googleCallback,
  (req, res) => {
    authController.googleCallbackSuccess(req, res);
  }
);

// Naver 로그인 라우트
router.get('/naver', authController.naverLogin);

router.get('/naver/callback',
  authController.naverCallback,
  (req, res) => {
    authController.naverCallbackSuccess(req, res);
  }
);

module.exports = router;