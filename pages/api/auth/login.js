// https://github.com/Herpryth/MERN-Passport-Authentication

import nextConnect from 'next-connect'
import passport from '../../../lib/passport'

import { checkAuthError, checkReqBody } from '../../../util/errors'

const handler = nextConnect()
  .use(passport.initialize())
  .post((req, res) => {
    passport.authenticate('local-login', function (error, user, token) {
      try {
        checkReqBody(req.body, '/auth/login')
        checkAuthError(error)

        req.logIn(user, function (error, data) {
          checkAuthError(error)
        })

        return res.json({
          jwt: token,
          user: { username: user.username, folders: user.folders }
        })
      } catch (error) {
        return res.status(error.status).json({ message: error.message })
      }
    })(req, res)
  })

export default handler
