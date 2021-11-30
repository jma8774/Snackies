const express = require('express');
const router = express.Router();
const db = require("../database/mongoose")


// On Success: Add item/quantity/size to user cart
router.post('/add', async function (req, res) {
  try {
    const { userId, itemId, size, quantity } = req.body
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
            sizeInCart=true;
          } 
        })
        if(!sizeInCart) x.quantity.push({size: size, qty: quantity})
      }
      cartCount += x.quantity.length
    })

    if(!itemInCart) {
      cartCount ++
      user.cart.push({ itemId: itemId, quantity: [{size: size, qty: quantity}] })
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