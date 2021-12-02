const express = require('express');
const router = express.Router();
const db = require("../database/mongoose")
const ObjectId = require('mongoose').Types.ObjectId; 


// On Success: Get a new review by user id
router.get('/', async function (req, res) {
  try {
    const { userId, itemId } = req.query
    const exist = await db.Item.findByIdAndUpdate(itemId).elemMatch("reviews", { user: new ObjectId(userId) })
    if(exist) {
      console.log(userId)
      for(const review of exist.reviews) {
        if(review.user.toString() === userId) {
          res.json({ rating: review.rating, message: review.message, created: review.created })
          break
        }
      }
    } else {
      res.json({ rating: 1, message: '', created: null })
    }
  } catch (err) {
    console.log('Post Review Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

// On Success: Post/Update a new review
router.post('/', async function (req, res) {
  try {
    const { itemId, userId, rating, message } = req.body
    const created = new Date()
    let item = await db.Item.findById(itemId)
    const exist = await db.Item.findByIdAndUpdate(itemId).elemMatch("reviews", { user: new ObjectId(userId) })
    if(exist) {
      const updateReview = { "reviews.$.user": userId, "reviews.$.rating": rating, "reviews.$.message": message, "reviews.$.created": created }
      await db.Item.updateOne({ _id: itemId, "reviews.user": userId }, updateReview)
    } else {
      const newReview = { user: userId, rating: rating, message: message, created: created }
      item.reviews.push(newReview)
      await item.save()
    }
    item = await db.Item.findById(itemId)
    const total = item.reviews.reduce((accum, x) => accum + x.rating, 0)
    item.rating = item.reviews.length > 0 ? total/item.reviews.length : 0
    await item.save()
    res.json({rating, message, created})
  } catch (err) {
    console.log('Post Review Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

// On Success: Get all reviews by page
router.get('/getAll', async function (req, res) {
  try {
    const { itemId, reviewsPerPage, page, sort } = req.query
    const items = await db.Item.findById(itemId).populate('reviews.user', ['first_name', 'last_name'])
    items.reviews.sort((a, b) => {
      // 0: sort by newest, 1: sort by highest rating, 2: sort by lowest rating
      if(sort === '0')
        return new Date(a.created) > new Date(b.created) ? -1 : 1
      else if(sort === '1')
        return a.rating > b.rating ? -1 : 1
      else 
        return a.rating > b.rating ? 1 : -1
    })
    res.json({reviews: items.reviews.slice(page*reviewsPerPage, page*reviewsPerPage+reviewsPerPage), numPages: Math.ceil(items.reviews.length/reviewsPerPage)})
  } catch (err) {
    console.log('Get Reviews Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

module.exports = router;