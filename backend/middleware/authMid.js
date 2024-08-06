function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login'); // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  }
}

module.exports = { ensureAuthenticated };
