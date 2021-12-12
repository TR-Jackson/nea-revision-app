import User from '../../models/User'
import dbConnect from '../../lib/dbConnect'

const JwtStrategy = require('passport-jwt').Strategy

const cookieExtractor = (req) => {
  return req.cookies.jwt
}

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET
}

const jsonWebTokenStrategy = new JwtStrategy(opts, async function (
  jwtPayload,
  done
) {
  await dbConnect()
  User.findOne({ _id: jwtPayload.sub }, function (err, user) {
    if (err) {
      return done(err, false)
    } else if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
})

export default jsonWebTokenStrategy
