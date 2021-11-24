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
        if (err) return res.status(401).json();

        if (!user) return res.status(401).json({ message: "Unauthorised" });
        // req: {
        // foldername
        // flashcards: [{front, back, ?id, ?refresh}]
        // }
        const folder = await Folder.findOne({
          name: req.body.folder,
          owner: user._id,
        });
        const boxStatus = [...folder.boxStatus];
        if (!folder) return res.status(404).json();
        req.body.flashcards.forEach((card) => {
          if (card?._id) {
            Flashcard.findOne({ _id: card._id, owner: user._id }).exec(
              (err, existingCard) => {
                if (err) return res.status(500).json();
                const box = existingCard.box;
                existingCard.front = card.front;
                existingCard.back = card.back;
                existingCard.box = req.body.refresh ? 0 : existingCard.box;
                existingCard.notStudied = card.refresh || false;
                existingCard.nextReview =
                  card.refresh || false ? new Date(0) : existingCard.nextReview;

                existingCard.save((error) => {
                  if (error) return res.status(500).json();
                });
                boxStatus[box] = boxStatus[box] - 1;
                boxStatus[0] = boxStatus[0] + 1;
              }
            );
          } else {
            const newCard = new Flashcard({
              folder: folder._id,
              owner: user._id,
              front: card.front,
              back: card.back,
            });
            newCard.save((error) => {
              if (error) return res.status(500).json();
            });
            boxStatus[0] = boxStatus[0] + 1;
          }
        });
        folder.boxStatus = boxStatus;
        await folder.save();
        return res.json({ success: true });
      }
    )(req, res);
  });

export default handler;
