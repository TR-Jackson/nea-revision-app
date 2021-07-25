const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

import User from "../../models/User";
import dbConnect from "../../lib/dbConnect";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const jsonWebTokenStrategy = new JwtStrategy(opts, async function (
  jwt_payload,
  done
) {
  await dbConnect();
  User.findOne({ _id: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    } else if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

export default jsonWebTokenStrategy;
