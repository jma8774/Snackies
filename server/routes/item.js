const express = require('express');
const router = express.Router();
const db = require("../database/mongoose")


// Load items to home page
router.get('/', async function (req, res) {
  try {
    let { itemsPerPage, page, search, sort, filter } = req.query
    sort = {
      ...JSON.parse(sort),
      _id: -1 
    }
    const matchQuery = {
      ...(search !== '') && { $text: { $search: search } },
      ...(filter !== 'All') && { brand: filter }
    }
    const queryItems = await db.Item.aggregate([
      { $match: matchQuery }, // Queries based on filter and search
      { $facet: {
        count:  [{ $count: "count" }],
        applySortSkipLimit: [
          { $sort: sort },  // Sort base on user
          { $skip: (page-1) * parseInt(itemsPerPage) }, // How many items to skip
          { $limit: parseInt(itemsPerPage) } // How many items per page
        ]
      }}
    ])
    res.json({items: queryItems[0].applySortSkipLimit, totalItems: queryItems[0].count.length > 0 ? queryItems[0].count[0].count : 0 })
  } catch (err) {
    console.log('Get Items Error:\n', err)
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