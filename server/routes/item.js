const express = require('express');
const router = express.Router();
const db = require("../database/mongoose")


// Load items to home page
// On Success: Loads 10 items
router.get('/', async function (req, res) {
  try {
    const { itemsPerPage, page, sort, filter } = req.query
    const items = await db.Item.find(filter === "All" ? {} : { brand: filter })
      .sort(JSON.parse(sort))
      .skip((page-1) * parseInt(itemsPerPage)) // how many items to skip
      .limit(parseInt(itemsPerPage)) // how many items per page
    res.json(items)
  } catch (err) {
    console.log('Get Items Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

router.get('/length', async function (req, res) {
  try {
    const { filter } = req.query
    const totalItems = await db.Item.find(filter === "All" ? {} : { brand: filter })
    res.json(totalItems.length)
  } catch (err) {
    console.log('Get Length Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

// Get item details + the related items
router.get('/getById', async function (req, res) {
  try {
    const { itemId } = req.query
    const item = await db.Item.findById(itemId)
    // Related Items
    let related = await db.Item.aggregate([
      { $match: { $text: { $search: item.brand } } },
      { $sample: { size: 4 } },
      { $project: { name: 1, image: 1, rating: 1 } }
    ])
    related = related.filter((el) => el.name !== item.name)
    res.json({item: item, related: related.slice(0, 3)})
  } catch (err) {
    console.log('Get Item By Id Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

module.exports = router;