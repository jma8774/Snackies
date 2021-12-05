const express = require('express');
const router = express.Router();
const db = require("../database/mongoose")
const jwtAuth = require("../middleware/jwtAuth")



// On Success: Get all items in user cart
router.get('/', jwtAuth.authenticateToken, async function (req, res) {
  try {
    const { userId } = req.query
    const user = await db.User.findById(userId).populate("cart.itemId", ['name', 'image'])
    res.json(user.cart)
  } catch (err) {
    console.log('Get User Cart Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

// On Success: Add/subtract item/quantity/size to user cart
router.post('/add', jwtAuth.authenticateToken, async function (req, res) {
  try {
    const { userId, itemId, size, quantity, price } = req.body
    const user = await db.User.findById(userId)
    let itemInCart = false
    let cartCount = 0
    
    user.cart.forEach((x) => {
      if(x.itemId.toString() === itemId) {
        itemInCart = true
        let sizeInCart = false
        x.quantity.forEach((y) => { 
          if(y.size === size) { 
            y.qty += quantity; 
            if(y.qty === 0) {
              // Remove it
              x.quantity = x.quantity.filter((el) => el.size !== size)
              if(x.quantity.length === 0) user.cart = user.cart.filter((el) => el.itemId.toString() !== itemId)
            }
            sizeInCart = true;
          } 
        })
        if(!sizeInCart) x.quantity.push({size: size, qty: quantity, price: price })
      }
      cartCount += x.quantity.length
    })

    if(!itemInCart) {
      cartCount ++
      user.cart.push({ itemId: itemId, quantity: [{size: size, qty: quantity, price: price }] })
    }

    await user.save()
    // Return total number of items in cart
    res.json(cartCount)
  } catch (err) {
    console.log('Add Cart Item Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

module.exports = router;