import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import User from "../../../models/User";

const handler = nextConnect()
  .use(passport.initialize())
  .post((req, res) => {
    passport.authenticate(
      "local-jwt",
      { session: false },
      function (err, user) {
        if (err) {
          return res.status(500).json({
            message: err || "Something happend",
            err: err.message || "Server error",
          });
        }
        if (!user) {
          return res.status(401).json({ message: "Unauthorised" });
        }

        if (!req.body?.folderName || req.body?.folderName?.length < 2)
          return res.status(400).json({ message: "Invalid foldername" });

        User.findOne(user).exec((err, user) => {
          if (err) {
            return res.status(500).json({
              message: err || "Something happend",
              err: err.message || "Server error",
            });
          }
          user.folders.push({
            name: req.body.folderName,
            progress: [0, 0, 0, 0, 0],
            lastReview: new Date(),
            description: req.body?.description || "",
          });
          user.save((err) => {
            if (err) {
              return res.status(500).json({
                message: err || "Something happend",
                err: err.message || "Server error",
              });
            }
            return res.json({ success: true });
          });
        });
      }
    )(req, res);
  });

export default handler;
