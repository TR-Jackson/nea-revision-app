import nextConnect from 'next-connect'
import passport from '../../../lib/passport'

import { calcBound, calcNewEF, calcTNR } from '../../../util/SM-2'
import Flashcard from '../../../models/Flashcard'
import Folder from '../../../models/Folder'
import ReviseSession from '../../../models/ReviseSession'
import {
  checkAuthError,
  checkAuthorised,
  checkReqBody
} from '../../../util/errors'

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
          checkReqBody(req.body, '/flashcard/response')

          const flashcard = await Flashcard.findOne({
            _id: req.body.flashcardId
          })
          if (!flashcard) throw { status: 400, message: 'Invalid flashcard ID' }

          const folder = await Folder.findOne({
            _id: flashcard.folder
          })
          if (Math.floor(Date.now() / 86400000) * 86400000 < folder.nextReview.getTime()) throw { status: 200, message: 'Already finished revising today' }

          const reviseSession = await ReviseSession.findOne({
            folder: folder._id
          })

          if (!reviseSession.toReview.includes(flashcard._id)) throw { status: 400, message: 'Invalid flashcard ID' }

          const newRevisedStatus = [...folder.revisedStatus]
          const q = req.body.q
          flashcard.EF = calcNewEF(flashcard.EF, q)
          if (!flashcard.reviewedToday) {
            if (flashcard.notStudied) newRevisedStatus[0]--
            else newRevisedStatus[calcBound(flashcard.n)]--

            if (q >= 4) {
              reviseSession.toReview = reviseSession.toReview.filter(
                (id) => !id.equals(flashcard._id)
              )
              flashcard.n++
              flashcard.nextReview = calcTNR(flashcard.n, flashcard.EF)
            } else if (q === 3) {
              flashcard.reviewedToday = true
              flashcard.n++
            } else if (q < 3) {
              flashcard.reviewedToday = true
              flashcard.n = 0
            }

            newRevisedStatus[calcBound(flashcard.n)]++
          } else {
            if (q >= 4) {
              flashcard.reviewedToday = false
              reviseSession.toReview = reviseSession.toReview.filter(
                (id) => !id.equals(flashcard._id)
              )
              flashcard.nextReview = calcTNR(flashcard.n, flashcard.EF)
            }
          }
          folder.revisedStatus = newRevisedStatus
          if (reviseSession.toReview.length === 0) folder.nextReview = new Date(Math.floor(Date.now() / 86400000) * 86400000 + 86400000)
          flashcard.notStudied = false

          await flashcard.save()
          await folder.save()
          await reviseSession.save()

          return res.json({ success: true })
        } catch (error) {
          return res.status(error.status).json({ message: error.message })
        }
      }
    )(req, res)
  })

export default handler
