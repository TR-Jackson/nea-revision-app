https://github.com/Herpryth/MERN-Passport-Authentication/tree/master/server/Auth

const passport = require("passport");

//Serialize user with passport using hes/her username
passport.serializeUser(function (username, done) {
  done(null, username);
});

//Deserialize user with passport using hes/her username
passport.deserializeUser(function (username, done) {
  done(null, username);
});

//Requiring Login - Register strategy files
const LoginStrategy = require("./LoginStrategy");
const RegisterStrategy = require("./RegisterStrategy");
const JwtStrategy = require("./JwtStrategy");
//Using the above
passport.use("local-login", LoginStrategy);
passport.use("local-register", RegisterStrategy);
passport.use("local-jwt", JwtStrategy);

module.exports = passport;
