const express = require('express');
const router = express.Router();
const db = require("../database/mongoose")
const jwt = require("../middleware/jwtAuth")
const stripe = require('stripe')(process.env.STRIPE_KEY);


function parseLineItems(cart, taxRate) {
  let items = []
  for(const item of cart) {
    const {name, image} = item.itemId
    for(const quantity of item.quantity) {
      items.push({
        price_data: {
          currency: "USD",
          product_data: {
            name: `${name} (${quantity.size})`,
            images: [`https://www.nocaplol.xyz/snacks${image}`],
          },
          unit_amount_decimal: quantity.price.toString().replace(".", ""),
          tax_behavior: "exclusive"
        },
        quantity: quantity.qty,
        tax_rates: [taxRate.id]
      })
    }
  }
  return items
}

// Initiate Stripe Checkout
router.post('/init', jwt.authenticateToken, async function (req, res) {
  try {
    const user = await db.User.findOne({email: req.email}).populate("cart.itemId", ["name", "image"])
    const taxRate = await stripe.taxRates.create({
      display_name: 'Sales',
      percentage: 8.875,
      inclusive: false,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: parseLineItems(user.cart, taxRate),
      mode: 'payment',
      customer_email: req.email,
      success_url: `${process.env.DOMAIN_NAME}/summary?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN_NAME}/cart?canceled=true&session_id={CHECKOUT_SESSION_ID}`,
    });
    await user.save()
    res.redirect(303, session.url);
  } catch (err) {
    console.log('Initiate Checkout Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

// Complete an Order
router.post('/complete', async function (req, res) {
  const { session_id } = req.body
  try {
    const exist = await db.Order.findOne({stripe_session_id: session_id})
    if(exist) 
      return res.status(400).send({ message: 'Order has been fufilled' })
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const items = await stripe.checkout.sessions.listLineItems(session.id);
    console.log(items)
    res.json(session);
  } catch (err) {
    console.log('Complete Order Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

module.exports = router;