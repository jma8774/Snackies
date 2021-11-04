const jwt = require('jsonwebtoken');  

function generateAccessToken(email) {
  return jwt.sign(email, process.env.TOKEN_SECRET, {});
}

function authenticateToken(req, res, next) {
  const token = req.cookies.token
  
  if (token === undefined) return res.sendStatus(401)
  
  console.log("Authenticate Token:", token.substring(0,7)+"...")

  jwt.verify(token, process.env.TOKEN_SECRET, (err, email) => {
    if (err) {
      console.log(err)
      return res.sendStatus(403)
    }

    req.email = email
    console.log("Authenticate User Email:", email)
    next()
  })
}

module.exports = {generateAccessToken, authenticateToken}