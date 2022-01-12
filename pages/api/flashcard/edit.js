// USE UPDATE FOLDER INSTEAD

// import nextConnect from 'next-connect'
// import passport from '../../../lib/passport'

// import Flashcard from '../../../models/Flashcard'
// import Folder from '../../../models/Folder'
// import {
//   checkAuthError,
//   checkAuthorised,
//   checkReqBody
// } from '../../../util/errors'

// const handler = nextConnect()
//   .use(passport.initialize())
//   .post((req, res) => {
//     passport.authenticate(
//       'local-jwt',
//       { session: false },
//       async function (err, user) {
//         try {
//           checkAuthError(err)
//           checkAuthorised(user)
//           checkReqBody(req.body, '/flashcard/edit')

//           const flashcard = await Flashcard.findOne({ _id: req.body.flashcardId })
//           if (!flashcard) throw { status: 500, message: 'Flashcard not found' }

//           flashcard.front = req.body.front
//           flashcard.back = req.body.back
//           if (req.body.reset) {
//             flashcard.nextReview = Date.now()
//             flashcard.box = 0
//             flashcard.notStudied = true
//             const folder = await Folder.findOne({ _id: flashcard.folder })
//             folder.boxStatus[0]++
//             folder.boxStatus[flashcard.box]--
//             await folder.save()
//           }
//           await flashcard.save()
//           return res.status(200).json({ success: true })
//         } catch (error) {
//           return res.status(error.status).json({ message: error.message })
//         }
//       }
//     )(req, res)
//   })

// export default handler
