import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import { checkAuthError, checkReqBody } from "../../../util/errors";
import { checkAuthError, checkReqBody } from "../../../util/errors";

const handler = nextConnect()
  .use(passport.initialize())
  .post((req, res) => {
    passport.authenticate("local-login", function (error, user, token) {
      checkAuthError(error);
      checkReqBody(res, req.body, "/auth/login");

      req.logIn(user, function (error, data) {
        checkAuthError(error);
      });

      return res.json({
        jwt: token,
        user: { username: user.username, folders: user.folders },
      });
    })(req, res);
  });

export default handler;

// https://github.com/Herpryth/MERN-Passport-Authentication
