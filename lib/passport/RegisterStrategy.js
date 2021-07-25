const Strategy = require("passport-local").Strategy;
import bcrypt from "bcrypt";

import User from "../../models/User";
import dbConnect from "../dbConnect";

const SignupStrategy = new Strategy(
  { passReqToCallback: true, usernameField: "username" },
  async function (req, username, password, done) {
    await dbConnect();
    User.findOne({ username })
      .lean()
      .exec(async (err, user) => {
        if (err) {
          return done(err, null);
        }

        if (!user) {
          const { username } = req.body;

          const encryptedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({
            username: username,
            password: encryptedPassword,
            folders: [],
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

export default SignupStrategy;
