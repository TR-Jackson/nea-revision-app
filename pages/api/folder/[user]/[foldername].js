import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import Folder from "../../../models/Folder";

const handler = nextConnect()
  .use(passport.initialize())
  .post((req, res) => {
    passport.authenticate(
      "local-jwt",
      { session: false },
      async function (err, user) {
        if (err) {
          return res.status(500).json({
            message: err || "Something happend",
            err: err.message || "Server error",
          });
        }
        const { foldername, owner } = req.query;
        const [err, folder] = await Folder.findOne({
          owner: owner,
          name: foldername,
        });
        if (err) {
          return res.status(500).json({
            message: err || "Something happend",
            err: err.message || "Server error",
          });
        }
        if (folder.isPrivate && (!user || user.username !== owner)) {
          return res.status(401).json({ message: "Unauthorised" });
        }
        // return flashcards
      }
    )(req, res);
  });

export default handler;
