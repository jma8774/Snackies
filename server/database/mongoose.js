const mongoose = require('mongoose');
const moment = require('moment')
const initSnacks = require('./initialize/initializeSnacks')
const User = require('./schemas/User').User;
const Item = require('./schemas/Item').Item;
const Order = require('./schemas/Order').Order;

async function connect() {
  await mongoose.connect(process.env.MONGO_URI);
}

connect().catch(err => console.log(err));

// initSnacks.clearSnacks()
// initSnacks.addSnacks()

function cartCount(cart) {
  let count = 0
  for(const item of cart) {
    count += item.quantity.length
  }
  return count
}

module.exports = { connect, User, Item, Order, cartCount}