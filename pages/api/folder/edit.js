import nextConnect from 'next-connect'
import passport from '../../../lib/passport'

import { checkAuthError, checkAuthorised, checkReqBody } from '../../../util/errors'
import Folder from '../../../models/Folder'

// API route for editing a folder's details
// Used by the Folder page
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
          checkReqBody(req.body, '/folder/edit')

          const folder = await Folder.findOne({ name: req.body.folderName })
          if (!folder) throw { status: 400, message: 'Folder not found' }

          if (req.body.newFolderName) { // If a new folder name provided
            // Check the folder name isn't already in use
            const checkFolder = await Folder.findOne({ name: req.body.newFolderName })
            if (checkFolder) throw { status: 400, message: 'Folder name already in use' }
            folder.name = req.body.newFolderName
          }
          if (req.body.description) { // If a new description provided
            folder.description = req.body.description
          }

          await folder.save()
          return res.json({ success: true })
        } catch (error) {
          return res.status(error.status).json({ message: error.message })
        }
      }
    )(req, res)
  })

export default handler
