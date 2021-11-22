import nextConnect from "next-connect";
import passport from "../../../lib/passport";
import Flashcard from "../../../models/Flashcard";

import Folder from "../../../models/Folder";
import User from "../../../models/User";

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

        const owner = await User.findOne({ username: req.body.owner });
        const folder = await Folder.findOne({
          owner: owner._id,
          name: req.body.folder,
        });
        if (folder.isPrivate && !user._id.equals(owner._id))
          res.status(401).json({ message: "Unauthorised" });

        const flashcards = await Flashcard.find({
          folder: folder._id,
          owner: owner._id,
        });
        return res.json({ folder: folder, flaschards: flashcards });
      }
    )(req, res);
  });

export default handler;
