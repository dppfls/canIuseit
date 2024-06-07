const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const expirationRoutes = require('./routes/expiration');
const { sequelize, initDb } = require('./models');
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

// Body Parser 미들웨어 설정
app.use(bodyParser.json());

// 라우트 설정
app.use('/auth', require('./routes/auth'));
app.use('/api', expirationRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1><a href="/auth/google">Login with Google</a><br><a href="/auth/naver">Login with Naver</a>');
});

app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.send(`<h1>Profile Page</h1><p>${JSON.stringify(req.user)}</p>`);
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await initDb();

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
