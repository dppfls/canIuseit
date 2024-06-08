const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require('fs');
const FileStore = require('session-file-store')(session);
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth");
const expirationRoutes = require("./routes/expiration");
const sequelize = require("./models/sequelize");
const initDb = require("./models/initDb");
require("./config/passport-setup");

const app = express();

// 세션 설정
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore()
}));

// Passport 미들웨어 설정
app.use(passport.initialize());
app.use(passport.session());

// Body Parser 미들웨어 설정
app.use(bodyParser.json());

// 라우트 설정
app.use('/auth', authRoutes);
app.use('/api', expirationRoutes);

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, 'public')));

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 프로필 라우트 설정
app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.send(`<h1>Profile Page</h1><p>${JSON.stringify(req.user)}</p>`);
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await initDb();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();

