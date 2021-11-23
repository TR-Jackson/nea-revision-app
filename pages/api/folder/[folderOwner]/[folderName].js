import nextConnect from "next-connect";
import passport from "../../../../lib/passport";
import Flashcard from "../../../../models/Flashcard";

import Folder from "../../../../models/Folder";
import User from "../../../../models/User";

const handler = nextConnect()
  .use(passport.initialize())
  .get((req, res) => {
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
        const { folderOwner, folderName } = req.query;
        const owner = await User.findOne({ username: folderOwner });
        if (!owner) {
          return res.status(404).json();
        }
        const folder = await Folder.findOne({
          owner: owner._id,
          name: folderName,
        });
        if (!folder) return res.status(404).json();
        if (folder.isPrivate && !owner._id.equals(user._id))
          res.status(401).json({ message: "Unauthorised" });

        const flashcards = await Flashcard.find({
          folder: folder._id,
          owner: owner._id,
        });
        return res.json({ folder: folder, flashcards: flashcards });
      }
    )(req, res);
  });

export default handler;
