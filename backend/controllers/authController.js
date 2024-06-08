const passport = require('passport');

// 구글 로그인 처리
exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

// 구글 로그인 콜백 처리
exports.googleCallback = passport.authenticate('google', { failureRedirect: '/' });

exports.googleCallbackSuccess = (req, res) => {
    res.redirect('/profile');
};

// 네이버 로그인 처리
exports.naverLogin = passport.authenticate('naver');

// 네이버 로그인 콜백 처리
exports.naverCallback = passport.authenticate('naver', { failureRedirect: '/' });

exports.naverCallbackSuccess = (req, res) => {
    res.redirect('/profile');
};

