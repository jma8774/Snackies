const express = require('express');
const router = express.Router();
const jwtAuth = require("../middleware/jwtAuth")
const googleOAuth = require("../middleware/googleOAuth")
const mailer = require("../mailer")
const db = require("../database/mongoose")
const bcrypt = require('bcrypt');

// Bcrypt: The number of hashing rounds, higher = more computational time required
const saltRounds = 10;

// Check if user has sent a valid JWT token
// On Success: Log the user in with all their information
router.get('/', jwtAuth.authenticateToken, async function (req, res) {
  try {
    // req.email is set by jwtAuth.authenticateToken after it has verified the JWT
    const user = await db.User.findOne({email: req.email}).exec()
    userData = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      cart_count: db.cartCount(user.cart),
      addresses: user.address
    }
    res.json(userData)
  } catch (err) {
    console.log('Get User Info Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

// User login to check their username and password
// On Success: Generate a JWT to store in their cookies
router.post('/login', async function (req, res) {
  const {email, password} = req.body
  // Confirm with database
  const user = await db.User.findOne({email: email}).exec()
  if(user === null) return res.status(401).send({ message: "Incorrect username/password" })
  // Compare input password with hash password
  const correct = await bcrypt.compare(password, user.password)
  if(!correct) return res.status(401).send({ message: "Incorrect username/password" })
  // Save JWT token in cookies
  const token = jwtAuth.generateAccessToken(email)
  res.cookie('token', token);
  res.send({token});
})

// Google OAuth login by verifying the Google OAuth token ID sent
// On Success: Generate a JWT to store in their cookies
router.post('/googleAuth', googleOAuth.authenticateGoogleToken, async function (req, res) {
  try {
    // Get profile info from Google using Token
    const profile = req.payload
    const userData = {
      email: profile.email,
      password: null,
      first_name: profile.given_name,
      last_name: profile.family_name
    }
    // Check if user email exist, if not we make a new user
    const user = await db.User.findOne({email: profile.email}).exec()
    if(user === null) {
      let newUser = new db.User(userData)
      newUser = await newUser.save()
      // Send email to user about their registration
      mailer.signup({ to: profile.email, name: profile.given_name } )
    }
    // Save JWT token in cookies
    const token = jwtAuth.generateAccessToken(userData.email)
    res.cookie('token', token);
    res.send({token});
  } catch (err) {
    console.log('Google Login Error:\n', err)
    return res.status(400).send({ message: 'Error has occurred' })
  }
})

// User signup to check that the email doesn't exist in the database
// On Success: Create a new user in our MongoDB database and generate a JWT to store in their cookies
router.post('/signup', async function (req, res) {
  const {email, password, first_name, last_name} = req.body   
  const exist = await db.User.findOne({email: email}).exec() 
  if(exist)
    return res.status(409).send({ message: "Email already exist" }) // Already Exist Status Code 
  // Generate a hash password to store in database
  const passwordHash = await bcrypt.hash(password, saltRounds)
  // Creating new database entry
  let user = new db.User({
    email: email,
    password: passwordHash,
    first_name: first_name,
    last_name: last_name
  })
  await user.save()
  // Send email to user about their registration
  mailer.signup({ to: email, name: first_name } )
  // Save JWT token in cookies
  const token = jwtAuth.generateAccessToken(email)
  // Send Email
  res.cookie('token', token);
  res.send({token});
})

module.exports = router;