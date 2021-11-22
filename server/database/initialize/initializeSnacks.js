const mongoose = require('mongoose');
const Item = require('../schemas/Item').Item;
const allSnacks = require('./snacks').snacks;

async function clearSnacks() {
  try {
    await Item.deleteMany({}).exec()
  } catch(e) {
    console.log(e)
  }
}

async function addSnacks() {
  try {
    await Item.create(allSnacks)
  } catch(e) {
    console.log(e)
  }
}
module.exports = { clearSnacks, addSnacks }