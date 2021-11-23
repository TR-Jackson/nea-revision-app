import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import Folder from "../../../models/Folder";

const handler = nextConnect()
  .use(passport.initialize())
  .get((req, res) => {
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
        Folder.find({ owner: user._id }).exec((err, folders) => {
          if (err) {
            return res.status(500).json({
              message: err || "Something happend",
              err: err.message || "Server error",
            });
          }
          return res.json(folders);
        });
      }
    )(req, res);
  });

export default handler;
