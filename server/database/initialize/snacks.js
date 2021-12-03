const pringles = require('./brands/pringles').all;
const doritos = require('./brands/doritos').all;
const snickers = require('./brands/snickers').all;
const lays = require('./brands/lays').all;
const kitkat = require('./brands/kitkat').all;
const pocky = require('./brands/pocky').all;
const cheetos = require('./brands/cheetos').all;
const oreo = require('./brands/oreo').all;
const hershey = require('./brands/hershey').all;


// We need to populate our market with goods, this is how I initialize the database documents
const snacks = doritos.concat(pringles).concat(snickers).concat(lays).concat(kitkat).concat(pocky).concat(cheetos).concat(oreo).concat(hershey)

module.exports = { snacks }