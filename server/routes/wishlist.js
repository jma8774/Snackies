const express = require('express');
const router = express.Router();
const db = require("../database/mongoose")


router.get('/', async function (req, res) {
  try {
    const { email } = req.query
    const user = await db.User.findOne({email: email}).exec() 
    res.json(user.wishlist)
  } catch (err) {
    console.log('Get Favorites Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

router.post('/remove', async function (req, res) {
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

router.post('/add', async function (req, res) {
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