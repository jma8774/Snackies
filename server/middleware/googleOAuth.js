const {OAuth2Client} = require('google-auth-library');
// It is okay not to hide Client ID in .env file according to Google 
const client = new OAuth2Client("305329395376-rkplg1snf07kq9b7otnkvp16ialcqj6t.apps.googleusercontent.com");

async function authenticateGoogleToken(req, res, next) {
  const { tokenId } = req.body
  
  if (tokenId === undefined) return res.status(401).send({message: "Undefined Google OAuth token"})
  
  try {
    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: "305329395376-rkplg1snf07kq9b7otnkvp16ialcqj6t.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    req.payload = payload
    next()
  } catch(err) {
    console.log("Google Token Error:", err.response ? err.response.data : err)
    return res.status(403).send({message: "Bad Google OAuth token"})
  }
}

module.exports = {authenticateGoogleToken}
