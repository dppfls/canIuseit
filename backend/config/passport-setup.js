// 기존 코드에서 충돌난다고 떠서  지우고 .env 랑 passport setup 다시 만들었습니다 -준희 

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const User = require('../models/User');
require('dotenv').config();

passport.serializeUser((user, done) => { //사용자 정보를 세션에 저장
  done(null, user.id);
});

passport.deserializeUser((id, done) => { //사용자가 인증된 후, 각 요청에서 세션에 저장된 사용자 정보를 불러옴
  console.log('Deserialize User ID:', id);
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(err => {
      console.error('Error deserializing user:', err);
      done(err, null);
    });
});

// Google Strategy 설정
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let [user, created] = await User.findOrCreate({
      where: { googleId: profile.id },
      defaults: { googleId: profile.id }
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

// Naver Strategy 설정
passport.use(new NaverStrategy({
  clientID: process.env.NAVER_CLIENT_ID,
  clientSecret: process.env.NAVER_CLIENT_SECRET,
  callbackURL: process.env.NAVER_CALLBACK_URL || '/auth/naver/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let [user, created] = await User.findOrCreate({
      where: { naverId: profile.id },
      defaults: { naverId: profile.id }
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));
