const mongoose = require('mongoose');
const moment = require('moment')
const User = require('./schemas/User').User;
const Item = require('./schemas/Item').Item;
const Order = require('./schemas/Order').Order;

async function connect() {
  await mongoose.connect('mongodb://localhost:27017/snacksDev');
}

connect().catch(err => console.log(err));

const address = {
  street: "2369 W 11th St",
  apt: "Apt 2A",
  city: "Brooklyn",
  state: "New York",
  zip: 11223
}

const person = new User({
  email: "jma8774@bths.edu",
  password: "somehash", // need to hash it
  first_name: "Jia Ming",
  last_name: "Ma",
})


async function createUser(userData) {
  try {
    const person = new User(userData)
    newUser = await person.save()
    console.log("Created new user\n", newUser); 
  } catch (err) {
    console.log('Create user error (user exist?)\n', err);
  }
}

// createUser(person)

const doritos = new Item({
  name: "Dorito Not Spicy",
  brand: "Dorito",
  description: "Spicy Dorito, wow!",
  rating: 2.5,
  reviews: [{
    name: "Jeemong",
    rating: 2.5,
    message: "Very good chips!",
    created: new Date()
  }],
  prices: [{ size: "small", price: 1}, { size: "big", price: 2 }],
  image: "/spicyDorito.png"
})

// doritos.save()

// User.findById("61832d4dba2e41ef9f0ed22c", (err, user) => {
//   if (err) {
//     console.log("Find error\n", err)
//     return
//   }
//   if (user === null) {
//     console.log("User not found")
//     return
//   }
//   // user.cart.push("618321db42383a4692b7ccdb")
//   user.history.push("61832c473e1ab468528d7e93")
//   user.save()
//   console.log("User updated")
// })

// User.findById("618314d5c283e1c2ec589ec8").populate('cart').
// exec(function (err, user) {
//   if (err) return handleError(err);
//   console.log(user.cart);
// });

const order = new Order({
  user: "618314d5c283e1c2ec589ec8",
  totalPrice: 0,
  items: ["618321db42383a4692b7ccdb"],
  status: "Delivered",
  address: address
})

// order.save()

// Order.findById("61832c473e1ab468528d7e93").
// populate('user').
// populate('items').
// exec(function (err, order) {
//   if (err) return handleError(err);
//   console.log(order.user);
//   console.log(order.items);
// });

module.exports = { connect }