const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
require('./config/passport-setup');

const app = express();

// 세션 설정
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport 미들웨어 설정
app.use(passport.initialize());
app.use(passport.session());

// 라우트 설정
app.use('/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1><a href="/auth/google">Login with Google</a><br><a href="/auth/naver">Login with Naver</a>');
});

app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.send(`<h1>Profile Page</h1><p>${JSON.stringify(req.user)}</p>`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
