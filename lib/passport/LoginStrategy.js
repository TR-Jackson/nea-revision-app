import User from '../../models/User'
import bcrypt from 'bcrypt'
import dbConnect from '../dbConnect'
import { issueJWT } from '../../util/auth'

const Strategy = require('passport-local').Strategy

const LoginStrategy = new Strategy(
  { usernameField: 'username' },
  async function (username, password, done) {
    await dbConnect()
    User.findOne({ username: username })
      .lean()
      .exec((err, user) => {
        if (err) {
          return done(err, null, null)
        }
        if (!user) {
          return done('Username or Password not valid', null, null)
        }

        bcrypt.compare(password, user.password, function (err, isValid) {
          if (err) return done('An error has occurred', null, null)
          else if (!isValid) {
            return done('Username or Password not valid', null, null)
          }
          return done(null, user, issueJWT(user))
        })
      })
  }
)

export default LoginStrategy
