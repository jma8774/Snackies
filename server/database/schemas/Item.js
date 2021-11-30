const mongoose = require('mongoose');
const {Schema, model, Date, ObjectId} = mongoose

const reviewSchema = Schema({
  user: { type: ObjectId, ref: 'User' },
  rating: Number,
  message: String,
  created: Date
})

const priceSchema = Schema({
  size: String,
  price: Number
})

const userRatingSchema = Schema({
  user: { type: ObjectId, ref: 'User' },
  rating: Number
})

const itemSchema = Schema({
  name: { type: String, index: true},
  brand: { type: String, index: true},
  description: String,
  rating: { type: Number, default: 0, index: true },
  ratings: [userRatingSchema],
  reviews: [reviewSchema],
  prices: [priceSchema],
  basePrice: { type: Number, index: true},
  image: String
});

const Item = model('Item', itemSchema);

module.exports = { Item }