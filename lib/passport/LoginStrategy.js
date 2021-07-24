const Strategy = require("passport-local").Strategy;
const User = require("../../models/User");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const issueJWT = (user) => {
  const _id = user._id;

  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.SECRET, {
    expiresIn: expiresIn,
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

const LoginStrategy = new Strategy({ usernameField: "username" }, function (
  username,
  password,
  done
) {
  User.findOne({ username })
    .lean()
    .exec((err, user) => {
      if (err) {
        return done(err, null, null);
      }
      if (!user) {
        return done("No user found", null, null);
      }

      bcrypt.compare(password, user.password, function (err, isValid) {
        if (err) return done("An error has occurred", null, null);
        else if (!isValid) {
          return done("Username or Password not valid", null, null);
        }
        return done(null, user, issueJWT(user));
      });
    });
});

module.exports = LoginStrategy;
