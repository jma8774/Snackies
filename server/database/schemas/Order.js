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

const itemSchema = Schema({
  itemId: { type: ObjectId, ref: 'Item' },
  name: String,
  size: String,
  price: Number,
  quantity: Number,
  image: String,
})

const orderSchema = Schema({
  user: { type: ObjectId, ref: 'User' },
  stripe_session_id: String,
  created: Date,
  arrivalDate: Date,
  subTotal: Number,
  tax: Number,
  totalPrice: Number,
  items: [itemSchema],
  status: String,
  address: addressSchema
});

const Order = model('Order', orderSchema);

module.exports = { Order }