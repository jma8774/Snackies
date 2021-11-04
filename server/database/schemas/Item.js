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
  brand: { type: String, index: true},
  description: String,
  rating: { type: Number, default: 0, index: true },
  reviews: [reviewSchema],
  prices: [priceSchema],
  basePrice: Number,
  image: String
});

const Item = model('Item', itemSchema);

module.exports = { Item }