import nextConnect from "next-connect";
import passport from "../../../../lib/passport";
import Flashcard from "../../../../models/Flashcard";

import { checkAuthError, checkAuthorised } from "../../../../util/errors";
import Folder from "../../../../models/Folder";
import User from "../../../../models/User";

const handler = nextConnect()
  .use(passport.initialize())
  .get((req, res) => {
    passport.authenticate(
      "local-jwt",
      { session: false },
      async function (err, user) {
        try {
          checkAuthError(err);
          checkAuthorised(user);

          const { folderOwner, folderName } = req.query;

          const owner = await User.findOne({ username: folderOwner });
          if (!owner) return res.status(404).json();

          const folder = await Folder.findOne({
            owner: owner._id,
            name: folderName,
          });
          if (!folder) return res.status(404).json();

          if (folder.isPrivate && !owner._id.equals(user._id))
            return res.status(404).json();

          const flashcards = await Flashcard.find({
            folder: folder._id,
            owner: owner._id,
          });
          return res
            .status(200)
            .json({ folder: folder, flashcards: flashcards });
        } catch (error) {
          return res.status(error.status).json({ message: error.message });
        }
      }
    )(req, res);
  });

export default handler;
