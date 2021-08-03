import nextConnect from "next-connect";
import passport from "../../../lib/passport";

const handler = nextConnect()
  .use(passport.initialize())
  .post((req, res) => {
    passport.authenticate("local-login", function (error, user, token) {
      if (error) {
        return res.status(500).json({
          message: error || "Something happend",
          error: error.message || "Server error",
        });
      }

      req.logIn(user, function (error, data) {
        if (error) {
          return res.status(500).json({
            message: error || "Something happend",
            error: error.message || "Server error",
          });
        }
      });

      user.isAuthenticated = true;
      return res.json({
        user: { username: user.username, folders: user.folders },
        jwt: token,
      });
    })(req, res);
  });

export default handler;

// https://github.com/Herpryth/MERN-Passport-Authentication
