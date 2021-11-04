const mongoose = require('mongoose');
const {Schema, model, Date} = mongoose

const reviewSchema = Schema({
  name: String,
  rating: Number,
  message: String,
  created: Date
})

const priceSchema = Schema({
  size: String,
  price: Number
})

const itemSchema = Schema({
  name: String,
  brand: String,
  description: String,
  rating: { type: Number, default: 0 },
  reviews: [reviewSchema],
  prices: [priceSchema],
  image: String
});

const Item = model('Item', itemSchema);

module.exports = { Item }