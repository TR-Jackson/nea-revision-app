const Strategy = require("passport-local").Strategy;

import User from "../../models/User";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbConnect from "../dbConnect";

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

const LoginStrategy = new Strategy(
  { usernameField: "username" },
  async function (username, password, done) {
    await dbConnect();
    User.findOne({ username: username })
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
  }
);

export default LoginStrategy;
