import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import Flashcard from "../../../models/Flashcard";
import User from "../../../models/User";

const handler = nextConnect()
  .use(passport.initialize())
  .post((req, res) => {
    passport.authenticate(
      "local-jwt",
      { session: false },
      function (err, user) {
        if (err) {
          return res.status(500).json({
            message: err || "Something happend",
            err: err.message || "Server error",
          });
        }
        if (!user) {
          return res.status(401).json({ message: "Unauthorised" });
        }
        // req: {
        // folder
        // flashcards: [{front, back, id}]

        // }
        const newCards = req.body.flashcards.filter((card) => !!card._id);
        for (const card in newCards) {
          const newCard = new Flashcard({
            ...card,
            folder: req.body.folder,
            owner: user.username,
            nextReview: 0,
          });
          newCard.save((error) => {
            if (error) {
              return res.status(500).json({
                message: error || "Something happend",
                error: err.message || "Server error",
              });
            }
          });
        }
        const existingCards = req.body.flashcards.filter((card) => !card._id);
        for (const card in existingCards) {
          // get card, update it and save it
          Flashcard.findOne({ _id: card._id }).exec(
            async (err, existingCard) => {
              if (err) {
                return res.status(500).json({
                  message: error || "Something happend",
                  error: err.message || "Server error",
                });
              }
              existingCard = {
                ...existingCard,
                front: card.front,
                back: card.back,
              };
              existingCard.save((error) => {
                if (err) {
                  return res.status(500).json({
                    message: error || "Something happend",
                    error: err.message || "Server error",
                  });
                }
              });
            }
          );
        }
        return res.json({success: true})
    )(req, res);
  });

export default handler;
