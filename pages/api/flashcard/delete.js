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

        const flashcard = await Flashcard.findOne({
          _id: req.body.flashcardId,
        });

        if (!flashcard)
          return res.status(404).json({ message: "Invalid flashcard" });

        const folder = await Folder.findOne({
          _id: flashcard.folder,
        });

        if (!folder)
          return res.status(404).json({ message: "Invalid foldername" });

        if (!folder.owner.equals(user._id))
          return res.status(401).json({ message: "Unauthorised" });

        await Flashcard.deleteOne({
          folder: folder._id,
          _id: req.body.flashcardId,
        });
        return res.status(200).json();
      }
    )(req, res);
  });

export default handler;
