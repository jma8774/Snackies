const express = require('express');
const router = express.Router();
const db = require("../database/mongoose")


// Load items to home page
// On Success: Loads 10 items
router.get('/', async function (req, res) {
  try {
    const items = await db.Item.find().limit(12)
    res.json(items)
  } catch (err) {
    console.log('Get Items Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

module.exports = router;