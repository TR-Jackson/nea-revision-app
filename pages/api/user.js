import nextConnect from "next-connect";
import passport from "../../lib/passport";

import { checkAuthError, checkAuthorised } from "../../util/errors";

const handler = nextConnect()
  .use(passport.initialize())
  .get((req, res) => {
    passport.authenticate(
      "local-jwt",
      { session: false },
      function (err, user) {
        try {
          checkAuthError(err);
          checkAuthorised(user);

          if (!user) {
            return res.json(false);
          }
          return res.json({ username: user.username });
        } catch (error) {
          if (error.status === 401) res.json(false);
          else return res.status(error.status).json({ message: error.message });
        }
      }
    )(req, res);
  });

export default handler;
