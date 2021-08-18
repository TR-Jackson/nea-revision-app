import nextConnect from "next-connect";
import passport from "../../../lib/passport";

const handler = nextConnect()
  .use(passport.initialize())
  .post((req, res) => {
    passport.authenticate("local-login", function (error, user, token) {
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
      });

      return res.json({
        jwt: token,
        user: { username: user.username, folders: user.folders },
        success: true,
      });
    })(req, res);
  });

export default handler;

// https://github.com/Herpryth/MERN-Passport-Authentication
