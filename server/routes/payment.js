const express = require('express');
const router = express.Router();
const db = require("../database/mongoose")
const stripe = require('stripe')('pk_test_51K4fV3A8ML82j4L3xjuinxFGtkw5B3J2zed7SXvnCF1BUVXZXo9fkr4zxh9bnmh6N4Ax1EWWSWbz1rUjkpg4LqNy00zhdgEE2f');


// Get the ClientSecret from Stripe
router.get('/secret', async function (req, res) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 0,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.json({client_secret: paymentIntent.client_secret});
  } catch (err) {
    console.log('Client Secret Error:\n', err)
    res.status(400).send({ message: 'Error has occurred' })
  }
})

module.exports = router;