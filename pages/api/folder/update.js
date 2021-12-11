import nextConnect from 'next-connect'
import passport from '../../../lib/passport'

import {
  checkAuthError,
  checkAuthorised,
  checkReqBody
} from '../../../util/errors'
import Flashcard from '../../../models/Flashcard'
import Folder from '../../../models/Folder'

const handler = nextConnect()
  .use(passport.initialize())
  .post((req, res) => {
    passport.authenticate(
      'local-jwt',
      { session: false },
      async function (err, user) {
        try {
          checkAuthError(err)
          checkReqBody(req.body, '/folder/update')
          checkAuthorised(user)

          const folder = await Folder.findOne({
            name: req.body.folder,
            owner: user._id
          })
          if (!folder) throw { message: 'Folder not found', status: 400 }

          const boxStatus = [...folder.boxStatus]
          const newCards = []

          for (const i in req.body.flashcards) {
            const card = req.body.flashcards[i]
            if (card?._id) {
              const flashcard = await Flashcard.findOne({
                _id: card._id,
                owner: user._id
              })

              const box = flashcard.box
              flashcard.front = card.front
              flashcard.back = card.back
              flashcard.box = req.body.refresh ? 0 : flashcard.box
              flashcard.notStudied = card.refresh
              flashcard.nextReview = card.refresh
                ? new Date(0)
                : flashcard.nextReview

              await flashcard.save()
              boxStatus[box] = boxStatus[box] - 1
              boxStatus[0] = boxStatus[0] + 1
            } else {
              const newCard = new Flashcard({
                folder: folder._id,
                owner: user._id,
                front: card.front,
                back: card.back
              })

              const inserted = await newCard.save()
              newCards.push(inserted)
              boxStatus[0] = boxStatus[0] + 1
            }
          }
          folder.boxStatus = boxStatus
          await folder.save()
          return res.json({ flashcards: newCards })
        } catch (error) {
          return res.status(error.status).json({ message: error.message })
        }
      }
    )(req, res)
  })

export default handler
