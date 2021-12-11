// https:github.com/Herpryth/MERN-Passport-Authentication/tree/master/server/Auth

import passport from 'passport'

import LoginStrategy from './LoginStrategy'
import RegisterStrategy from './RegisterStrategy'
import JwtStrategy from './JwtStrategy'
import User from '../../models/User'

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  await dbConnect()
  User.findOne({ _id: id }, (err, user) => {
    done(err, user)
  })
})

passport.use('local-login', LoginStrategy)
passport.use('local-register', RegisterStrategy)
passport.use('local-jwt', JwtStrategy)

export default passport
