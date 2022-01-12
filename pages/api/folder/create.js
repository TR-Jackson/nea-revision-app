import nextConnect from 'next-connect'
import passport from '../../../lib/passport'

import {
  checkAuthError,
  checkReqBody,
  checkAuthorised
} from '../../../util/errors'
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
          checkReqBody(req.body, '/folder/create')
          checkAuthorised(user)

          const folder = await Folder.findOne({
            owner: user._id,
            name: req.body.folderName
          })

          if (folder) throw { message: 'Folder already exists', status: 400 }

          const newFolder = new Folder({
            owner: user._id,
            name: req.body.folderName,
            description: req.body.description
          })
          const savedFolder = await newFolder.save()

          const newReviseSession = new ReviseSession({
            folder: savedFolder._id
          })
          await newReviseSession.save()

          return res.status(200).json({ success: true })
        } catch (error) {
          return res.status(error.status).json({ message: error.message })
        }
      }
    )(req, res)
  })

export default handler
