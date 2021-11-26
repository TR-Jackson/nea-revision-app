import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import Flashcard from "../../../models/Flashcard";
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
        if (!user) {
          return res.status(401).json({ message: "Unauthorised" });
        }

        if (!req.body?.folder || req.body?.folder?.length < 2)
          return res.status(400).json({ message: "Invalid folder" });

        const folder = await Folder.findOne({
          owner: user._id,
          name: req.body.folder,
        });
        if (!folder) return res.status(400).json({ message: "Invalid folder" });
        await Flashcard.deleteMany({ folder: folder._id });
        await Folder.deleteOne(folder);
        return res.status(200).json();
      }
    )(req, res);
  });

export default handler;
