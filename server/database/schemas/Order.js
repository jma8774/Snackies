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

const orderSchema = Schema({
  user: { type: ObjectId, ref: 'User' },
  created: { type: mongoose.Date, default: new Date() },
  arrivalDate: { type: mongoose.Date, default: moment(new Date()).add(30, 'm')  },
  totalPrice: Number,
  items: [{ type: ObjectId, ref: 'Item' }],
  status: String,
  address: addressSchema
});

const Order = model('Order', orderSchema);

module.exports = { Order }