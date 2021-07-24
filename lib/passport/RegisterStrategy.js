const Strategy = require("passport-local").Strategy;
const User = require("../../models/User");
const bcrypt = require("bcrypt");

const SignupStrategy = new Strategy(
  { passReqToCallback: true, usernameField: "username" },
  function (req, username, password, done) {
    User.findOne({ username })
      .lean()
      .exec(async (err, user) => {
        if (err) {
          return done(err, null);
        }

        if (!user) {
          const { username } = req.body;

          const encryptedPassword = await bcrypt.hash(password, 10);

          let newUser = new User({
            username,
            password: encryptedPassword,
            first_name,
            last_name,
          });
          newUser.save((error, inserted) => {
            if (error) {
              return done(error, null);
            }
            return done(null, inserted);
          });
        }
        if (user) {
          return done("User already exist. Please login!", null);
        }
      });
  }
);

module.exports = SignupStrategy;
