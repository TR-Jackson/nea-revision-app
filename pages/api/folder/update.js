import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import {
  checkAuthError,
  checkAuthorised,
  checkReqBody,
} from "../../../util/errors";
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
          checkReqBody(req.body, "/folder/update");
          checkAuthorised(user);

          const folder = await Folder.findOne({
            name: req.body.folder,
            owner: user._id,
          });
          if (!folder) throw { message: "Folder not found", status: 400 };

          const boxStatus = [...folder.boxStatus];
          const newCards = [];

          req.body.flashcards.forEach(async (card) => {
            if (card?._id) {
              const flashcard = await Flashcard.findOne({
                _id: card._id,
                owner: user._id,
              });

              const box = flashcard.box;
              flashcard.front = card.front;
              flashcard.back = card.back;
              flashcard.box = req.body.refresh ? 0 : flashcard.box;
              flashcard.notStudied = card.refresh || false;
              flashcard.nextReview =
                card.refresh || false ? new Date(0) : flashcard.nextReview;

              await flashcard.save();
              boxStatus[box] = boxStatus[box] - 1;
              boxStatus[0] = boxStatus[0] + 1;
            } else {
              const newCard = new Flashcard({
                folder: folder._id,
                owner: user._id,
                front: card.front,
                back: card.back,
              });

              const inserted = await newCard.save();
              newCards.push(inserted);
              boxStatus[0] = boxStatus[0] + 1;
            }
          });

          folder.boxStatus = boxStatus;
          await folder.save();
          return res.json({ flashcards: newCards });
        } catch (error) {
          return res.status(error.status).json({ message: error.message });
        }
      }
    )(req, res);
  });

export default handler;

//   req.body.flashcards.forEach(async (card) => {
//     if (card?._id) {
//       Flashcard.findOne({ _id: card._id, owner: user._id }).exec(
//         (err, existingCard) => {
//           if (err) return res.status(500).json();
//           const box = existingCard.box;
//           existingCard.front = card.front;
//           existingCard.back = card.back;
//           existingCard.box = req.body.refresh ? 0 : existingCard.box;
//           existingCard.notStudied = card.refresh || false;
//           existingCard.nextReview =
//             card.refresh || false ? new Date(0) : existingCard.nextReview;

//           existingCard.save((error) => {
//             if (error) return res.status(500).json();
//           });
//           boxStatus[box] = boxStatus[box] - 1;
//           boxStatus[0] = boxStatus[0] + 1;
//         }
//       );
//     } else {
//       const newCard = new Flashcard({
//         folder: folder._id,
//         owner: user._id,
//         front: card.front,
//         back: card.back,
//       });
//       await newCard.save((error, inserted) => {
//         if (error) return res.status(500).json();
//         cb(inserted);
//       });
//       boxStatus[0] = boxStatus[0] + 1;
//     }
//   });
//   folder.boxStatus = boxStatus;
//   await folder.save();
//   return res.json({ flashcards: newCards });
// }
