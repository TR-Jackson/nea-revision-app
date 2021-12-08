import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import Flashcard from "../../../models/Flashcard";
import Folder from "../../../models/Folder";
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
          checkAuthorised(user);
          checkReqBody(req.body, "/flashcard/response");

          const flashcard = await Flashcard.findOne({
            _id: req.body.flashcardId,
          });
          if (!flashcard)
            throw { status: 400, message: "Invalid flashcard ID" };

          const folder = await Folder.findOne({
            _id: flashcard.folder,
          });

          if (req.body.correct) {
            flashcard.nextReview = new Date(
              (flashcard.box + 1) ** 2 * 86400000
            );
            const updatedBoxStatus = [...folder.boxStatus];
            if (flashcard.box < 5) {
              updatedBoxStatus[flashcard.box]--;
              updatedBoxStatus[flashcard.box + 1]++;
              flashcard.box++;
            }
            flashcard.notStudied = false;
          } else {
            flashcard.nextReview = new Date(
              (flashcard.box - 1) ** 2 * 86400000
            );
            if (flashcard.box > 0) {
              updatedBoxStatus[flashcard.box]--;
              updatedBoxStatus[flashcard.box - 1]++;
              flashcard.box--;
            }
            flashcard.notStudied = false;
          }
          console.log(folder);
          console.log(flashcard);
          return res.json(true);
        } catch (error) {
          console.log(error);
          return res.status(error.status).json({ message: error.message });
        }
      }
    )(req, res);
  });

export default handler;
