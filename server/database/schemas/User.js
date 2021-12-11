const mongoose = require('mongoose');
const {Schema, model, ObjectId} = mongoose

const addressSchema = Schema({
  firstName: String,
  lastName: String,
  street: String,
  apt: String,
  city: String,
  state: String,
  zip: String
})

const cartItemSchema = Schema({
  itemId: { type: ObjectId, ref: 'Item' },
  quantity: [ { size: String, qty: Number, price: Number } ]
})

const userSchema = Schema({
  email: { type: String, unique: true },
  password: String, // need to hash it
  first_name: String,
  last_name: String,
  cart: [cartItemSchema],
  wishlist: [{ type: ObjectId, ref: 'Item' }],
  history: [{ type: ObjectId, ref: 'Order' }],
  address: { type: addressSchema, default: {
    firstName: '',
    lastName: '',
    street: '',
    apt: '',
    city: '',
    state: '',
    zip: ''
  }},
  created: mongoose.Date,
});


const User = model('User', userSchema);

module.exports = { User }