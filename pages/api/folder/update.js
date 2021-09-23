import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import Flashcard from "../../../models/Flashcard";

const handler = nextConnect()
  .use(passport.initialize())
  .post((req, res) => {
    passport.authenticate(
      "local-jwt",
      { session: false },
      function (err, user) {
        if (err) {
          return res.status(500);
        }
        if (!user) return res.status(401).json({ message: "Unauthorised" });
        // req: {
        // folder
        // flashcards: [{front, back, ?id, ?refresh}]
        // }
        req.body.flashcards.forEach((card) => {
          if (card?._id) {
            Flashcard.findOne({ _id: card._id }).exec(
              async (err, existingCard) => {
                if (err) {
                  return res.status(500);
                }
                existingCard = {
                  ...existingCard,
                  front: card.front,
                  back: card.back,
                  notStudied: req.body.refresh,
                  nextReview: req.body.refresh
                    ? new Date(0)
                    : new Date(card.nextReview.now() + 86400000),
                };
                existingCard.save((error) => {
                  if (error) {
                    return res.status(500);
                  }
                });
              }
            );
          } else {
            console.log(user.username);
            const newCard = new Flashcard({
              ...card,
              folder: req.body.folder,
              owner: user.username,
              nextReview: new Date(0),
              notStudied: true,
            });
            console.log("to save:", newCard);
            newCard.save((error, inserted) => {
              if (error) {
                return res.status(500);
              }
              console.log("inserted", inserted);
            });
          }
        });
        return res.json({ success: true });
      }
    )(req, res);
  });

export default handler;
