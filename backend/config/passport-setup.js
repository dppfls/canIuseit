const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const User = require('../models/User');
require('dotenv').config();

passport.serializeUser((user, done) => { // 로그인 최초로 성공한 사용자 정보를 세션에 저장
  done(null, user.userId);
});

// 페이지에 방문하는 모든 client에 대한 정보를 req.user 변수에 전달해주는 함수
// 사용자가 페이지 방문할 때마다 호출됨
passport.deserializeUser((userId, done) => { 
  console.log('Deserialize User ID:', userId);  // 수정된 부분
  User.findByPk(userId)
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
      where: { googleId: profile.id },  // 수정된 부분
      defaults: {
        googleId: profile.id,  // 수정된 부분
        provider: 'google'  // 로그인 플랫폼 정보 저장
      }
    });
    done(null, user);
  } catch (err) {
    console.error('Error in GoogleStrategy:', err);
    done(err, null);
  }
}));

// Naver Strategy 설정
passport.use(new NaverStrategy({
  clientID: process.env.NAVER_CLIENT_ID,
  clientSecret: process.env.NAVER_CLIENT_SECRET,
  callbackURL: process.env.NAVER_CALLBACK_URL || '/auth/naver/callback',
  state: true // state 값을 자동으로 생성하고 관리

}, async (accessToken, refreshToken, profile, done) => {
  try {
    let [user, created] = await User.findOrCreate({
      where: { naverId: profile.id },
      defaults: {
        naverId: profile.id,
        provider: 'naver'
      }
    });
    user.accessToken = accessToken;  // accessToken을 user 객체에 추가
    done(null, user);
  } catch (err) {
    console.error('Error in NaverStrategy:', err);
    done(err, null);
  }
}));

