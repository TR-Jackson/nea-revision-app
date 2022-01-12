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

          let toAdd = 30 - reviseSession.toReview.length
          let pool = []
          let idPool = [...reviseSession.toReview]
          for (const i in reviseSession.toReview) {
            const id = reviseSession.toReview[i]
            const card = await Flashcard.findOne(
              { _id: id },
              { folder: 0, owner: 0, nextReview: 0 }
            )
            pool.push(card)
          }
          if (reviseSession.dateAdded.getTime() === new Date(Math.floor(Date.now() / 86400000) * 86400000).getTime()) return res.json({ flashcards: pool })// if cards have already been added today just return the pool now, if not continue and update date added at end, floor date to the day

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

          const toAddToSession = []
          pool.forEach((card) => {
            toAddToSession.push(card._id)
          })
          reviseSession.toReview = toAddToSession
          reviseSession.dateAdded = new Date(Math.floor(Date.now() / 86400000) * 86400000)
          await reviseSession.save()
          return res.json({ flashcards: pool })
        } catch (error) {
          return res.status(error.status).json({ message: error.message })
        }
      }
    )(req, res)
  })

export default handler