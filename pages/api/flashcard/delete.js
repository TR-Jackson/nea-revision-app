import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import Flashcard from "../../../models/Flashcard";
import Folder from "../../../models/Folder";
import ReviseSession from "../../../models/ReviseSession";
import {
  checkAuthError,
  checkAuthorised,
  checkReqBody,
} from "../../../util/errors";

const handler = nextConnect()
  .use(passport.initialize())
  .post((req, res) => {
    passport.authenticate(
      "local-jwt",
      { session: false },
      async function (err, user) {
        try {
          checkAuthError(err);
          checkReqBody(req.body, "/flashcard/delete");
          checkAuthorised(user);

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

          const reviseSession = await ReviseSession.findOne({
            folder: folder._id,
          });

          reviseSession.toReview = reviseSession.toReview.filter(
            (id) => !flashcard._id.equals(id)
          );
          console.log(reviseSession.toReview);
          await reviseSession.save();

          await Flashcard.deleteOne({
            folder: folder._id,
            _id: req.body.flashcardId,
          });
          return res.status(200).json();
        } catch (error) {
          console.log(error);
          return res.status(error.status).json({ message: error.message });
        }
      }
    )(req, res);
  });

export default handler;
