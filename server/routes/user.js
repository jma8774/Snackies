const express = require('express');
const router = express.Router();
const jwtAuth = require("../jwtAuth")
const googleOAuth = require("../googleOAuth")
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

// User login
router.post('/login', async function (req, res) {
  const {email, password} = req.body
  // Confirm with database
  const user = await db.User.findOne({email: email}).exec()
  if(user === null || user.password !== password) 
    return res.json();
  // Save JWT token in cookies
  const token = jwtAuth.generateAccessToken(email)
  res.cookie('token', token);
  // console.log("Login: Generated Token Cookie")
  res.json({token});
})

// Google oauth login 
router.post('/googleAuth', async function (req, res) {
  const {tokenId} = req.body
  // Get profile info from Google using Token
  const profile = await googleOAuth.verify(tokenId)
  const userData = {
    email: profile.email,
    password: undefined,
    first_name: profile.given_name,
    last_name: profile.family_name
  }
  // Check if user email exist, if not we make a new user
  const user = await db.User.findOne({email: profile.email}).exec()
  if(user === null) {
    let newUser = new db.User(userData)
    newUser = await newUser.save()
  }
  // Generate token using email and set it 
  if(!userData.email)
    return res.json();
  const token = jwtAuth.generateAccessToken(userData.email)
  res.cookie('token', token);
  // console.log("Google Login: Generated Token Cookie")
  res.json({token});
})

// User signup
router.post('/signup', async function (req, res) {
  const {email, password, first_name, last_name} = req.body   
  const exist = await db.User.findOne({email: email}).exec() 
  if(exist)
    return res.json({ error: "Email exist"}) 
  let user = new db.User({
    email: email,
    password: password,
    first_name: first_name,
    last_name: last_name
  })
  await user.save()
  // Save JWT token in cookies
  const token = jwtAuth.generateAccessToken(email)
  res.cookie('token', token);
  // console.log("Signup: Generated Token Cookie")
  res.json({token});
})

module.exports = router;