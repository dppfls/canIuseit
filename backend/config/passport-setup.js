const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const NaverStrategy = require('passport-naver').Strategy; // 주석 처리
const User = require('../models/User'); // 사용자 모델을 불러오는 경로를 맞춰주세요

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID; // 주석 처리
// const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET; // 주석 처리

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
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
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

// Naver Strategy 설정 주석 처리
// passport.use(new NaverStrategy({
//   clientID: NAVER_CLIENT_ID,
//   clientSecret: NAVER_CLIENT_SECRET,
//   callbackURL: '/auth/naver/callback'
// }, (accessToken, refreshToken, profile, done) => {
//   // 사용자가 이미 존재하는지 확인하고, 없으면 새로 생성
//   User.findOne({ where: { naverId: profile.id } }).then((existingUser) => {
//     if (existingUser) {
//       done(null, existingUser);
//     } else {
//       new User({ naverId: profile.id }).save().then((user) => {
//         done(null, user);
//       });
//     }
//   }).catch(err => done(err, null));
// }));

