const mongoose = require('mongoose');
const {Schema, model} = mongoose

const kittySchema = Schema({
  name: String
});

const Kitten = model('Kitten', kittySchema);

module.exports = { Kitten }