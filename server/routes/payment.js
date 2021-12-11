const express = require('express');
const router = express.Router();
const db = require("../database/mongoose")
const jwt = require("../middleware/jwtAuth")
const stripe = require('stripe')(process.env.STRIPE_KEY);
const mailer = require("../mailer")
const moment = require('moment')

// Convert stripe item objects to cart items
async function parseSessionItems(items) {
  let orderItems = []
  for(const el of items) {
    let [name, size] = el.description.split("(").map(x => x.slice(0, -1))
    const item = await db.Item.findOne({name: name})
    orderItems.push({
      itemId: item.id,
      name: name,
      size: size,
      price: item.prices.filter((x) => x.size === size)[0].price,
      quantity: el.quantity,
      image: item.image
    })
  }
  return orderItems
}

// Covert cart items into objects for Stripe
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
            images: [`https://buy-snacks.herokuapp.com/snacks${image}`],
          },
          unit_amount_decimal: parseInt(quantity.price*100),
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
    if(user.cart.length === 0)
      return res.redirect(303, process.env.DOMAIN_NAME);
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
      cancel_url: `${process.env.DOMAIN_NAME}/cart?canceled=true`,
    });
    // console.log(session.id)
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
    // Check if order from Stripe has been fufilled already or not
    if(exist) 
      return res.json(exist);
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if(session.payment_status === "unpaid")
      return res.status(400).send({ message: 'Order not paid yet' })
    const items = await stripe.checkout.sessions.listLineItems(session.id);
    // Remove all items from current cart
    const user = await db.User.findOne({email: session.customer_email})
    user.cart = []
    // Create a new order history with checkout items
    let order = new db.Order({
      user: user.id,
      stripe_session_id: session.id,
      subTotal: parseFloat(session.amount_subtotal) / 100,
      tax: parseFloat(session.amount_total - session.amount_subtotal) / 100,
      totalPrice: parseFloat(session.amount_total) / 100,
      items: await parseSessionItems(items.data),
      status: "Processing",
      address: user.address,
      created: new Date(),
      arrivalDate: moment(new Date()).add(15, 'm').toDate()
    })
    await order.save()
    user.history.push(order.id)
    await user.save()
    // Send Email Confirmation
    mailer.orderComplete({ to: user.email, name: user.first_name, orderId: order.id.toString() })

    res.json(order);
  } catch (err) {
    console.log('Complete Order Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

module.exports = router;