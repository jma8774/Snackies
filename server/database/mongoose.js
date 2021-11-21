const mongoose = require('mongoose');
const moment = require('moment')
const initSnacks = require('./initializeSnacks')
const User = require('./schemas/User').User;
const Item = require('./schemas/Item').Item;
const Order = require('./schemas/Order').Order;

async function connect() {
  await mongoose.connect(process.env.MONGO_URI);
}

connect().catch(err => console.log(err));


const doritos = {
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

const pringles = {
  name: "Pringle Chips",
  brand: "Pringles",
  description: "Very good chips!",
  rating: 5,
  reviews: [{
    name: "Jeemong",
    rating: 2.5,
    message: "Very good chips!",
    created: new Date()
  }],
  prices: [{ size: "small", price: 1}, { size: "big", price: 2 }],
  basePrice: 2,
  image: "/pringle.png"
}

// initSnacks.clearSnacks()
// initSnacks.addSnacks([doritos, pringles, pringles, doritos, doritos, pringles, doritos, pringles, doritos, doritos, doritos])

function cartCount(cart) {
  let count = 0
  for(const item of cart) {
    count += item.quantity.length
  }
  return count
}

// Create a new user when they sign up
async function createUser(userData) {
  try {
    const person = new User(userData)
    newUser = await person.save()
    console.log("Create User: Success"); 
    return newUser
  } catch (err) {
    console.log('Create User: Error (user exist?)');
    // console.log(err)
  }
}

// User can add items to the cart
// The items will be represented as an array of such objects:
// [{  
//    itemId: "someId",
//    quantity: [ { size: "small", qty: 2 }, { size: "large", qty: 5 } ]
//  },
//  {  
//    itemId: "someId2",
//    quantity: [ { size: "medium", qty: 2 } ]
//  },
async function addCart(userId, newItem) {
  try {
    const user = await User.findById(userId)
    if (user === null) {
      console.log("Add Cart: User not found")
      return
    }
    // See if this item is already in cart, if not we create it
    const match = user.cart.filter(x => x["itemId"].toString() === newItem["itemId"])
    if(match.length === 0) {
      user.cart.push({  
        itemId: newItem["itemId"],
        quantity: [ { size: newItem["size"], qty: newItem["qty"] } ]
      })
    }
    // If already in cart, then we can add another size/quantity to it or update quantity of existing size
    user.cart.forEach(cartItem => {
      if(cartItem["itemId"].toString() === newItem["itemId"]) {
        let updated = false
        cartItem["quantity"].forEach(quantity => {
          if(quantity["size"] === newItem["size"]) {
            quantity["qty"] += newItem["qty"]
            updated = true
          }
        })
        if(!updated)
          cartItem["quantity"].push({ size: newItem["size"], qty: newItem["qty"]})
      }
    })
    user.save()
    console.log("Add Cart: Cart updated")
  } catch (err) {
    console.log('Add Cart: Error \n', err);
  }
}

// User can add an item to their wishlist
async function addWish(userId, itemId) {
  try {
    const user = await User.findById(userId)
    if (user === null) {
      console.log("Add Wish: User not found")
      return
    }
    user.wishlist.addToSet(itemId)
    user.save()
    console.log("Add Wishlist: Wishlist updated")
  } catch (err) {
    console.log('Add Wishlist: Error \n', err);
  }
}

// Used by createOrder, when an order is created, the user will get it on their history
async function addHistory(userId, orderId) {
  try {
    const user = await User.findById(userId)
    if (user === null) {
      console.log("Add History: User not found")
      return
    }
    user.history.addToSet(orderId)
    user.save()
    console.log("Add History: History updated")
  } catch (err) {
    console.log('Add History: Error \n', err);
  }
}

// After payment call this to create a new order
async function createOrder(orderData) {
  try {
    const order = new Order(orderData)
    console.log()
    newOrder = await order.save()
    await addHistory(orderData["user"], newOrder.id)
    console.log("Create Order: Success"); 
    return newOrder
  } catch (err) {
    console.log('Create Order: Error');
    // console.log(err)
  }
}

// Testing here
const address = {
  street: "2369 W 11th St",
  apt: "Apt 2A",
  city: "Brooklyn",
  state: "New York",
  zip: 11223
}

const person = {
  email: "jma8774@bths.edu",
  password: "somehash", // need to hash it
  first_name: "Jia Ming",
  last_name: "Ma",
}

const testUserId = "618381afb73a7612f5ba0deb"
// createUser(person)
// addCart(testUserId, {
//   itemId: "61836b3e62c0270ab506bd43",
//   size: "big",
//   qty: 2
// })
// addCart(testUserId, {
//   itemId: "61836b3e62c0270ab506bd43",
//   size: "small",
//   qty: 2
// })
// addCart(testUserId, {
//   itemId: "61837d502ee1ece76ca6f932",
//   size: "big",
//   qty: 2
// })
// addWish(testUserId, '61837d502ee1ece76ca6f932')
// createOrder({
//   user: testUserId,
//   totalPrice: 0,
//   items: [{
//     itemId: "61837d502ee1ece76ca6f932",
//     quantity: [ { size: "small", qty: 5 } ]
//   }],
//   status: "Delivered",
//   address: address
// })

// User.findById(testUserId)
// .populate({ 
//   path: 'history',
//   populate: {
//     path: 'items',
//     populate: {
//       path: 'itemId',
//     } 
//   } 
// })
// .exec(function (err, user) {
//   if (err) return handleError(err);
//   console.log("Testing populating History:\n", user.history[0]);

// });




module.exports = { connect, User, Item, Order, cartCount}