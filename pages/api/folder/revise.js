import nextConnect from 'next-connect'
import passport from '../../../lib/passport'

import {
  checkAuthError,
  checkAuthorised,
  checkReqBody
} from '../../../util/errors'
import Flashcard from '../../../models/Flashcard'
import ReviseSession from '../../../models/ReviseSession'
import Folder from '../../../models/Folder'

// API route for generating a pool of flashcards to be revised
// Used by the Revise page
const handler = nextConnect()
  .use(passport.initialize())
  .post((req, res) => {
    passport.authenticate(
      'local-jwt',
      { session: false },
      async function (err, user) {
        try {
          checkAuthError(err)
          checkAuthorised(user)
          checkReqBody(req.body, '/folder/revise')

          const folder = await Folder.findOne({ name: req.body.folderName })
          if (!folder) throw { message: 'Folder not found', status: 400 }

          const reviseSession = await ReviseSession.findOne({
            folder: folder._id
          })

          let toAdd = 30 - reviseSession.toReview.length //   Maximum of 30 flashcards returned
          let pool = [] // Flashcards to be returned to the client
          let idPool = [...reviseSession.toReview] // Add any flashcards from a previous revision session, idPool used in queries for checking flashcards haven't already been added to the pool
          // Adding the flashcards left over in revise session
          for (const i in reviseSession.toReview) {
            const id = reviseSession.toReview[i]
            const card = await Flashcard.findOne(
              { _id: id },
              { folder: 0, owner: 0, nextReview: 0 }
            )
            pool.push(card)
          }

          // If cards have already been added today just return the pool now, if not continue and update date added at end, floor date to the day
          if (reviseSession.dateAdded.getTime() === new Date(Math.floor(Date.now() / 86400000) * 86400000).getTime()) return res.json({ flashcards: pool })

          // Now adding new flashcards that have at least been reviewed once already
          const reviewed = await Flashcard.find(
            {
              _id: { $nin: idPool },
              folder: folder._id,
              notStudied: false,
              nextReview: { $lte: Date.now() }
            },
            { folder: 0, owner: 0, nextReview: 0 }
          )
            .limit(toAdd)
            .lean()
          pool = pool.concat(reviewed)

          idPool = [...idPool, ...pool.map((card) => card._id)]
          toAdd = toAdd - reviewed.length

          // If there is any space left then add some new flashcards unrevised flashcards to the pool
          if (toAdd > 0) {
            const notReviewed = await Flashcard.find(
              {
                folder: folder._id,
                notStudied: true,
                _id: { $nin: idPool }
              },
              { folder: 0, owner: 0, nextReview: 0 }
            )
              .limit(toAdd)
              .lean()
            pool = pool.concat(notReviewed)
          }

          // Save the new pool of flashcards to the revise session
          const toAddToSession = []
          pool.forEach((card) => {
            toAddToSession.push(card._id)
          })
          reviseSession.toReview = toAddToSession
          reviseSession.dateAdded = new Date(Math.floor(Date.now() / 86400000) * 86400000) // ensures more flashcards can't be added to the pool today
          await reviseSession.save()
          return res.json({ flashcards: pool })
        } catch (error) {
          return res.status(error.status).json({ message: error.message })
        }
      }
    )(req, res)
  })

export default handler
