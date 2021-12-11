const express = require('express');
const router = express.Router();
const jwtAuth = require("../middleware/jwtAuth")
const moment = require('moment')
const db = require("../database/mongoose")


// Get all user orders
router.get('/getAll', jwtAuth.authenticateToken, async function (req, res) {
  try {
    const email = req.email
    const user = await db.User.findOne({email: email}).populate("history")
    for(let i = 0; i < user.history.length; i ++) {
      if(user.history[i].status === "Delivered") continue
      const order = await db.Order.findById(user.history[i]._id)
      const now = moment()
      const arrival = moment(user.history[i].arrivalDate)
      const diff = now.diff(arrival, 'seconds') // now - arrival
      if(diff >= 0)
        order.status = "Delivered"
      else if(diff > -13.5 * 60)
        order.status = "Shipped"
      await order.save()
      user.history[i] = order
    }
    res.json(user.history.sort((order1, order2) => order2.created - order1.created))
  } catch (err) {
    console.log('Get All Orders Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

// Delete an order
router.post('/deleteOne', jwtAuth.authenticateToken, async function (req, res) {
  try {
    const { orderId } = req.body
    const email = req.email
    // See if user has this order
    const user = await db.User.findOne({email: email}).populate("history")
    if(!user.history.some((order) => order._id.toString() === orderId))
      return res.status(400).send({ message: 'User does not have this order' })
    // If user has this order, we delete it
    user.history = user.history.filter((el) => el._id.toString() !== orderId)
    await user.save()
    res.json(user.history.sort((order1, order2) => order2.created - order1.created))
  } catch (err) {
    console.log('Delete One Orders Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})
module.exports = router;