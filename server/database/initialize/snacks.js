const pringles = require('./brands/pringles').allPringles;
const doritos = require('./brands/doritos').allDoritos;
const snickers = require('./brands/snickers').allSnickers;


// We need to populate our market with goods, this is how I initialize the database documents

const test_doritos = {
  name: "Dorito Chips",
  brand: "Doritos",
  description: "Very good chips!",
  rating: 2.5,
  reviews: [{
    name: "Jeemong",
    rating: 2.5,
    message: "Very good chips!",
    created: new Date()
  }],
  prices: [{ size: "small", price: 1}, { size: "big", price: 2 }],
  basePrice: 1,
  image: "/dorito.png"
}

const snacks = doritos.concat(pringles).concat(snickers)

module.exports = { snacks }