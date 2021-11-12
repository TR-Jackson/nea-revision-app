import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import ReviseSession from "../../../models/ReviseSession";
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

        Folder.findOne({ owner: user._id, name: req.body?.folderName }).exec(
          (err, folder) => {
            if (err) {
              return res.status(500).json({
                message: err || "Something happend",
                err: err.message || "Server error",
              });
            }
            if (folder)
              return res.status(400).json({ message: "Folder already exists" });
            const newFolder = new Folder({
              owner: user._id,
              name: req.body?.folderName,
              description: req.body?.description,
            });
            newFolder.save((err, folder) => {
              if (err) {
                return res.status(500).json({
                  message: err || "Something happend",
                  err: err.message || "Server error",
                });
              }
              const newReviseSession = new ReviseSession({
                folder: folder._id,
              });
              newReviseSession.save((err) => {
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
        );
      }
    )(req, res);
  });

export default handler;
