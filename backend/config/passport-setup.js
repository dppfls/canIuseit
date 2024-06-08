

// 기존 코드에서 충돌난다고 떠서  지우고 .env 랑 passport setup 다시 만들었습니다 -준희 


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const User = require('../models/User'); 
require('dotenv').config(); 





passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  }).catch(err => done(err, null));
});

// Google Strategy 설정
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // 사용자가 이미 존재하는지 확인하고, 없으면 새로 생성
  User.findOne({ where: { googleId: profile.id } }).then((existingUser) => {
    if (existingUser) {
      done(null, existingUser);
    } else {
      new User({ googleId: profile.id }).save().then((user) => {
        done(null, user);
      });
    }
  }).catch(err => done(err, null));
}));

// Naver Strategy 설정
passport.use(new NaverStrategy({
  clientID: process.env.NAVER_CLIENT_ID,
  clientSecret: process.env.NAVER_CLIENT_SECRET,
  callbackURL: '/auth/naver/callback'
}, (accessToken, refreshToken, profile, done) => {
  // 사용자가 이미 존재하는지 확인하고, 없으면 새로 생성
  User.findOne({ where: { naverId: profile.id } }).then((existingUser) => {
    if (existingUser) {
      done(null, existingUser);
    } else {
      new User({ naverId: profile.id }).save().then((user) => {
        done(null, user);
      });
    }
  }).catch(err => done(err, null));
}));
