const mongoose = require('mongoose');
const Item = require('./schemas/Item').Item;

async function clearSnacks() {
  try {
    await Item.deleteMany({}).exec()
  } catch(e) {
    console.log(e)
  }
}

async function addSnacks(snacks) {
  try {
    await Item.create(snacks)
  } catch(e) {
    console.log(e)
  }
}
module.exports = { clearSnacks, addSnacks }