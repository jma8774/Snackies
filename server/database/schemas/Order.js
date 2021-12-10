const mongoose = require('mongoose');
const moment = require('moment')
const {Schema, model, ObjectId} = mongoose

const addressSchema = Schema({
  street: String,
  apt: String,
  city: String,
  state: String,
  zip: Number
})

const cartItemSchema = Schema({
  itemId: { type: ObjectId, ref: 'Item' },
  quantity: [ { size: String, qty: Number, price: Number } ]
})

const orderSchema = Schema({
  user: { type: ObjectId, ref: 'User' },
  stripe_session_id: String,
  created: { type: Date, default: new Date() },
  arrivalDate: { type: Date, default: moment(new Date()).add(30, 'm')  },
  subTotal: Number,
  tax: Number,
  totalPrice: Number,
  items: [cartItemSchema],
  status: String,
  address: addressSchema
});

const Order = model('Order', orderSchema);

module.exports = { Order }