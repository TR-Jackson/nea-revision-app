import nextConnect from 'next-connect'
import passport from '../../lib/passport'

import { checkAuthError, checkAuthorised } from '../../util/errors'

// API route for checking a user's JWT cookie (i.e. that they are logged on)
// Used by all pages that display user specific content
const handler = nextConnect()
  .use(passport.initialize())
  .get((req, res) => {
    passport.authenticate(
      'local-jwt',
      { session: false },
      function (err, user) {
        try {
          checkAuthError(err)
          checkAuthorised(user)
          // Returns the user's username as an indicator that they are authenticated
          return res.json({ username: user.username })
        } catch (error) {
          if (error.status === 401) res.json(false) // If JWT is invalid then return false for use in the useUser hook
          else return res.status(error.status).json({ message: error.message }) // Return error if actual error has occurred
        }
      }
    )(req, res)
  })

export default handler
