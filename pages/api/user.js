import nextConnect from "next-connect";
import passport from "../../lib/passport";

const handler = nextConnect()
  .use(passport.initialize())
  .get((req, res) => {
    passport.authenticate("local-jwt", function (err, user) {
      if (err) {
        return res.status(500).json({
          message: err || "Something happend",
          err: err.message || "Server error",
        });
      }
      return res.json({ username: user.username, folders: user.folders });
    })(req, res);
  });

export default handler;
