import passport from "../../../lib/passport";

export default function registerHandler(req, res) {
  passport.authenticate("local-register", function (error, user) {
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
    return res.json({ user: user, jwt: token });
  })(req, res);
}

// // https://github.com/Herpryth/MERN-Passport-Authentication
