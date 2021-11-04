const express = require('express');
const router = express.Router();
const jwtAuth = require("../jwtAuth")
const db = require("../database/mongoose")

function cartCount(cart) {
  let count = 0
  for(const item of cart) {
    count += item.quantity.length
  }
  return count
}

// Check if user has token, then we can just give front-end the user infos
router.get('/', jwtAuth.authenticateToken, async function (req, res) {
  try {
    const user = await db.User.findOne({email: req.email}).exec()
    userData = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      cart_count: cartCount(user.cart),
      addresses: user.address
    }
    res.json(userData)
  } catch (err) {
    console.log('Get User Info Error:\n', err);
    // console.log(err)
  }
})

// User logs in 
router.post('/login', function (req, res) {
  const {email, password} = req.body
  // Do database to confirm login
  // If good then give them a JWT token, which would authenticate them
  const token = jwtAuth.generateAccessToken(email)
  res.cookie('token', token);
  console.log("Login: Generated Token Cookie")
  res.json({ token });
})

module.exports = router;