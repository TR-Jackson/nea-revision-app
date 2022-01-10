import nextConnect from 'next-connect'
import passport from '../../../lib/passport'

import { calcBound } from '../../../util/SM-2'
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

          const newRevisedStatus = [...folder.revisedStatus]
          const newCards = []

          for (const i in req.body.flashcards) {
            const card = req.body.flashcards[i]
            if (card?._id) {
              const flashcard = await Flashcard.findOne({
                _id: card._id,
                owner: user._id
              })

              const prevN = flashcard.n
              flashcard.front = card.front
              flashcard.back = card.back
              flashcard.n = card.reset ? 1 : flashcard.n
              flashcard.EF = card.reset ? 2.5 : flashcard.EF
              flashcard.notStudied = card.reset
              flashcard.nextReview = card.reset
                ? new Date(0)
                : flashcard.nextReview
              await flashcard.save()

              if (card.reset) {
                newRevisedStatus[calcBound(prevN)]--
                newRevisedStatus[0]++
              }
            } else {
              const newCard = new Flashcard({
                folder: folder._id,
                owner: user._id,
                front: card.front,
                back: card.back
              })

              const inserted = await newCard.save()
              newCards.push(inserted)
              newRevisedStatus[0]++
            }
          }
          folder.revisedStatus = newRevisedStatus
          await folder.save()
          return res.json({ flashcards: newCards })
        } catch (error) {
          console.log(error)
          return res.status(error.status).json({ message: error.message })
        }
      }
    )(req, res)
  })

export default handler
