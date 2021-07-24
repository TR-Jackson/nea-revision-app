import passport from "../../../lib/passport";

export default function loginHandler(req, res) {
  passport.authenticate("local-login", function (error, user, info) {
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
    return res.json(user);
  })(req, res);
}

// https://github.com/Herpryth/MERN-Passport-Authentication
