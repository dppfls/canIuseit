// 기존 코드에서 충돌난다고 떠서  지우고 .env 랑 passport setup 다시 만들었습니다 -준희 

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const User = require('../models/User');
require('dotenv').config();

passport.serializeUser((user, done) => { //로그인 최초로 성공한 사용자 정보를 세션에 저장
  done(null, user.id);
});

//페이지에 방문하는 모든 client에 대한 정보를 req.user 변수에 전달해주는 함수
//사용자가 페이지 방문할 때 마다 호출됨
passport.deserializeUser((id, done) => { 
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
    const { id, displayName, emails, photos } = profile;
    const email = emails && emails[0].value;
    const profilePhoto = photos && photos[0].value;

    let [user, created] = await User.findOrCreate({
      where: { googleId: profile.id },
      defaults: { googleId: profile.id }
    });

    if (!created) {
      // 사용자 정보 업데이트 (선택 사항)
      user.name = displayName;
      user.email = email;
      user.profilePhoto = profilePhoto;
      await user.save();
    }

    done(null, user);
  } catch (err) {
    console.error('Error in GoogleStrategy:', err); // 에러 로깅 추가
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
    const { id, displayName, emails, photos } = profile;
    const email = emails && emails[0].value;
    const profilePhoto = photos && photos[0].value;

    let [user, created] = await User.findOrCreate({
      where: { naverId: profile.id },
      defaults: { naverId: profile.id }
    });

    if (!created) {
      // 사용자 정보 업데이트 (선택 사항)
      user.name = displayName;
      user.email = email;
      user.profilePhoto = profilePhoto;
      await user.save();
    }

    done(null, user);
  } catch (err) {
    console.error('Error in NaverStrategy:', err); // 에러 로깅 추가
    done(err, null);
  }
}));

module.exports = passport;