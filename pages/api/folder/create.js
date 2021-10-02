import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import Folder from "../../../models/Folder";

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

        Folder.findOne({ owner: user.username }).exec((err, folder) => {
          if (err) {
            return res.status(500).json({
              message: err || "Something happend",
              err: err.message || "Server error",
            });
          }
          if (folder)
            return res.status(400).json({ message: "Folder already exists" });
          const newFolder = new Folder({
            owner: user.username,
            name: req.body?.folderName,
          });
          newFolder.save((err) => {
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
