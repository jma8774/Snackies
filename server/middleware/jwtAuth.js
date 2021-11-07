const jwt = require('jsonwebtoken');  

function generateAccessToken(email) {
  return jwt.sign(email, process.env.TOKEN_SECRET, {});
}

function authenticateToken(req, res, next) {
  const token = req.cookies.token
  
  if (token === undefined) return res.status(401).send({message: "Undefined JWT token"})

  jwt.verify(token, process.env.TOKEN_SECRET, (err, email) => {
    if (err) {
      console.log("JWT Token Error:", err.response ? err.response.data : err)
      return res.status(403).send({message: "Bad JWT token"})
    }

    req.email = email
    next()
  })
}

module.exports = {generateAccessToken, authenticateToken}