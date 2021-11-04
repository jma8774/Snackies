const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("766162828005-efnc6r8ufsla9t4ter3ep7tt1t0q8ulb.apps.googleusercontent.com");

async function verify(tokenId) {
  const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: "766162828005-efnc6r8ufsla9t4ter3ep7tt1t0q8ulb.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();
  return payload
}
// verify().catch(console.error);

module.exports = {verify}
