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
            //   flashcard.nextReview
          }
        } catch (error) {
          return res.status(error.status).json({ message: error.message });
        }
      }
    );
  });

export default handler;
