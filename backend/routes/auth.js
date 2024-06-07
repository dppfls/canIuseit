const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google 로그인 라우트
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // 성공했을 때 리디렉션
    res.redirect('/profile');
  }
);

// Naver 로그인 라우트
router.get('/naver',
  passport.authenticate('naver')
);

router.get('/naver/callback',
  passport.authenticate('naver', { failureRedirect: '/' }),
  (req, res) => {
    // 성공했을 때 리디렉션
    res.redirect('/profile');
  }
);

module.exports = router;

