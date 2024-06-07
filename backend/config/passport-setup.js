// 변수 정리 해야함
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const NaverStrategy = require('passport-naver').Strategy;


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // 사용자 db 저장 및 검색
    return done(null, profile);
  }
));

passport.use(new NaverStrategy({
    clientID: NAVER_CLIENT_ID,
    clientSecret: NAVER_CLIENT_SECRET,
    callbackURL: '/auth/naver/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // 사용자 db 저장 및 검색
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
