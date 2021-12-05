const express = require('express');
const router = express.Router();
const jwtAuth = require("../middleware/jwtAuth")
const db = require("../database/mongoose")


// Given a user, get all their wishlist items
router.get('/', jwtAuth.authenticateToken, async function (req, res) {
  try {
    const { email, populated } = req.query
    let user;
    if(populated === "true")
      user = await db.User.findOne({email: email}).populate("wishlist").exec()
    else
      user = await db.User.findOne({email: email}).exec() 
    res.json(user.wishlist)
  } catch (err) {
    console.log('Get Favorites Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})


router.post('/remove', jwtAuth.authenticateToken, async function (req, res) {
  try {
    const { itemId, email } = req.body
    const user = await db.User.findOne({email: email}).exec() 
    user.wishlist.remove(itemId)
    await user.save()
    res.json(user.wishlist)
  } catch (err) {
    console.log('Remove Wishlist Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

router.post('/add', jwtAuth.authenticateToken, async function (req, res) {
  try {
    const { itemId, email } = req.body
    const user = await db.User.findOne({email: email}).exec() 
    user.wishlist.addToSet(itemId)
    await user.save()
    res.json(user.wishlist)
  } catch (err) {
    console.log('Add Wishlist Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})
module.exports = router;