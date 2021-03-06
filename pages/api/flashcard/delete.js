import nextConnect from 'next-connect'
import passport from '../../../lib/passport'

import Flashcard from '../../../models/Flashcard'
import Folder from '../../../models/Folder'
import ReviseSession from '../../../models/ReviseSession'
import {
  checkAuthError,
  checkAuthorised,
  checkReqBody
} from '../../../util/errors'
import { calcBound } from '../../../util/SM-2'

// API route for deleting flashcards
const handler = nextConnect()
  .use(passport.initialize())
  .post((req, res) => {
    passport.authenticate(
      'local-jwt',
      { session: false },
      async function (err, user) {
        try {
          checkAuthError(err)
          checkReqBody(req.body, '/flashcard/delete')
          checkAuthorised(user)

          // Delete the flashcard from the flashcards table
          // Remove it from the revise session if its in there

          const flashcard = await Flashcard.findOne({
            _id: req.body.flashcardId
          })
          if (!flashcard) throw { message: 'Invalid flashcard', status: 400 }

          const folder = await Folder.findOne({
            _id: flashcard.folder
          })
          if (!folder) throw { message: 'Invalid foldername', status: 400 }

          // Check if folder being deleted belongs to the user logged in
          if (!folder.owner.equals(user._id)) throw { message: 'Invalid flashcard', status: 400 }

          const reviseSession = await ReviseSession.findOne({
            folder: folder._id
          })

          reviseSession.toReview = reviseSession.toReview.filter(
            (id) => !flashcard._id.equals(id)
          )
          await reviseSession.save()

          // Remove flashcard from the folder's progress
          const updatedRevisedStatus = [...folder.revisedStatus]
          if (flashcard.notStudied) updatedRevisedStatus[0]--
          else updatedRevisedStatus[calcBound(flashcard.n)]--
          folder.revisedStatus = updatedRevisedStatus
          await folder.save()

          await Flashcard.deleteOne({
            folder: folder._id,
            _id: req.body.flashcardId
          })

          return res.status(200).json({ success: true })
        } catch (error) {
          return res.status(error.status).json({ message: error.message })
        }
      }
    )(req, res)
  })

export default handler
