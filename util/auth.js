import jsonwebtoken from 'jsonwebtoken'

// Function used by auth API route to generate a JWT for the user
export const issueJWT = (user) => {
  const _id = user._id

  const expiresIn = '86400000'

  const payload = {
    sub: _id,
    iat: Date.now()
  }

  const signedToken = jsonwebtoken.sign(payload, process.env.SECRET, {
    expiresIn: expiresIn
  })

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn
  }
}
