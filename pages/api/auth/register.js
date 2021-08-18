import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import { issueJWT } from "../../../util/auth";

const handler = nextConnect();

handler.use(passport.initialize()).post((req, res) => {
  passport.authenticate("local-register", function (error, user, info) {
    if (error) {
      return res.json({
        message: error || "Something happend",
        success: false,
      });
    }
    req.logIn(user, function (error, data) {
      if (error) {
        return res.json({
          message: error || "Something happend",
          success: false,
        });
      }
      const jwt = issueJWT(user);
      return res.json({
        jwt: jwt,
        user: { username: user.username, folders: user.folders },
        success: true,
      });
    });
  })(req, res);
});

export default handler;

// https://github.com/Herpryth/MERN-Passport-Authentication
