require('dotenv').config();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);  // Ensure this is correctly loaded

module.exports = stripe;
