import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import { issueJWT } from "../../../util/auth";
import { checkAuthError, checkReqBody } from "../../../util/errors";

const handler = nextConnect();

handler.use(passport.initialize()).post((req, res) => {
  passport.authenticate("local-register", function (error, user, info) {
    checkAuthError(error);
    checkReqBody(res, req.body, "/auth/login");

    req.logIn(user, function (error, data) {
      checkAuthError(error);
      const jwt = issueJWT(user);
      return res.json({
        jwt: jwt,
        user: { username: user.username, folders: user.folders },
      });
    });
  })(req, res);
});

export default handler;

// https://github.com/Herpryth/MERN-Passport-Authentication
