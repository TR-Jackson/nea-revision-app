export default function loginHandler(req, res) {
  passport.authenticate("local-login", function (error, user, token) {
    if (error) {
      console.log(error);
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

// need to find source
